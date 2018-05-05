using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Backend.Database;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Word")]
    public class WordController : Controller
    {
        private readonly BoggleDbContext context;

        public WordController(BoggleDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWordsByBoard(Guid id, CancellationToken cancellationToken)
        {
            if (id != Guid.Empty)
            {
                BoardState board = await context.BoardStates.FindAsync(new object[] {id}, cancellationToken);
                if (board != null)
                {
                    List<WordEntry> wordEntries =
                        await context.Words.Where(w => w.BoardId == id).ToListAsync(cancellationToken);
                    return Ok(wordEntries);
                }

                return NotFound("The requested board could not be found");
            }
            else
            {
                return BadRequest("The format of the given id is invalid");
            }
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> AddWordToBoard(Guid id, [FromBody]WordEntry addWord, CancellationToken cancellationToken)
        {
            if (id != Guid.Empty && ModelState.IsValid)
            {
                BoardState board = await context.BoardStates.FindAsync(new object[] {id}, cancellationToken);
                if (board != null)
                {
                    if (WordIsValid(addWord, board) && !(await WordAlreadyOnBoard(addWord, board, cancellationToken)) && OrderIsValid(addWord))
                    {
                        Guid substringId = await SubstringOnBoard(addWord, board, cancellationToken);
                        if (substringId != Guid.Empty)
                        {
                            WordEntry wordEntry =
                                await context.Words.FindAsync(new object[] {id = substringId}, cancellationToken);
                            wordEntry.Word = addWord.Word;
                            wordEntry.LetterOrder = addWord.LetterOrder;
                            board.Score = await CalculateScore(board, cancellationToken);
                            await context.SaveChangesAsync(cancellationToken);
                            board.Score = await CalculateScore(board, cancellationToken);
                            await context.SaveChangesAsync(cancellationToken);
                            return Ok(wordEntry);
                        }
                        else
                        {
                            addWord.BoardId = board.StateId;
                            var wordEntity = await context.Words.AddAsync(addWord, cancellationToken);
                            await context.SaveChangesAsync(cancellationToken);
                            board.Score = await CalculateScore(board, cancellationToken);
                            await context.SaveChangesAsync(cancellationToken);
                            return Ok(wordEntity.Entity);
                        }
                    }
                    else
                    {
                        return BadRequest("The given word and the order must be the same lenght");
                    }
                }

                return NotFound("The requested board could not be found");
            }

            return BadRequest("The format of the request is invalid");
        }

        /// <summary>
        /// Check wether the given word is possible to be made on the board and wether it is in the Dutch dictionary
        /// </summary>
        /// <param name="word">the word that should be checked</param>
        /// <param name="board">the board for which te word is to be checked</param>
        /// <returns></returns>
        private bool WordIsValid(WordEntry word, BoardState board)
        {
            // Check if word is 3 leters or more
            if (word.Word.Length == word.LetterOrder.Length && word.Word.Length >= 3)
            {
                // Check if letter and their spaces correspond with the board
                bool valid = true;
                for (int i = 0; i < word.Word.Length; i++)
                {
                    if (Char.ToLower(word.Word[i]) != Char.ToLower(board.Board[word.LetterOrder[i]]))
                    {
                        valid = false;
                        break;
                    }
                }

                // check duplicate dice
                if (word.LetterOrder.Length != word.LetterOrder.Distinct().Count())
                {
                    return false;
                }

                if (valid)
                {
                    // Check if word is dutch dictionary
                    string dictionaryWord = WordFileReader.Instance.Words.Find(s => s == word.Word.ToLower());
                    if (dictionaryWord != null && dictionaryWord == word.Word.ToLower())
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// Check whether a word is already on the board.
        /// Also checks wether there is a word on the board of which the new word is a substring
        /// </summary>
        /// <param name="word">The word that is played</param>
        /// <param name="board">the board for which the word is played</param>
        /// <returns></returns>
        private async Task<bool> WordAlreadyOnBoard(WordEntry word, BoardState board, CancellationToken cancellationToken = default(CancellationToken))
        {
            // Get a list of all words that are already played
            List<WordEntry> existingWords =
                await context.Words.Where(w => w.BoardId == board.StateId).ToListAsync(cancellationToken);

            // Check if word is existing or is a substring of an existing word.
            // If it's a substring it is checked wether it's the same letter order
            foreach (WordEntry wordEntry in existingWords)
            {
                if (wordEntry.Word == word.Word)
                {
                    return true;
                }
                if (wordEntry.Word.Contains(word.Word))
                {
                    bool result = false;
                    if (IsPalindrome(word.Word))
                    {
                        result = result || wordEntry.LetterOrder.Except(word.LetterOrder.Reverse()).Any();
                    }

                    result = result || wordEntry.LetterOrder.Except(word.LetterOrder).Any();

                    if (result)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// Check if a substring of the played word is already on the board
        /// </summary>
        /// <param name="wordEntry"></param>
        /// <param name="board"></param>
        /// <returns>return the guid of the word that is a substring of the played word</returns>
        private async Task<Guid> SubstringOnBoard(WordEntry wordEntry, BoardState board,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            List<WordEntry> playedWords =
                await context.Words.Where(w => w.BoardId == board.StateId).ToListAsync(cancellationToken);
            for (int i = 0; i < playedWords.Count; i++)
            {
                WordEntry word = playedWords[i];
                int substringIndex;
                if ((substringIndex = wordEntry.Word.IndexOf(word.Word)) != -1)
                {
                    int[] subLetterOrder = new int[word.Word.Length];
                    Array.Copy(wordEntry.LetterOrder, substringIndex, subLetterOrder, 0, word.Word.Length);
                    if (subLetterOrder.SequenceEqual(word.LetterOrder))
                    {
                        return word.WordId;
                    }

                    if (IsPalindrome(word.Word))
                    {
                        if (subLetterOrder.SequenceEqual(word.LetterOrder.Reverse()))
                        {
                            return word.WordId;
                        }
                    }
                }
            }

            return Guid.Empty;
        }

        private bool IsPalindrome(string word)
        {
            string first = word.Substring(0, word.Length / 2);
            char[] arr = word.ToCharArray();
            Array.Reverse(arr);
            string temp = new string(arr);
            string second = temp.Substring(0, temp.Length / 2);
            return first.Equals(second);
        }

        private bool OrderIsValid(WordEntry word)
        {
            bool valid = true;
            for (int i = 0; i < word.LetterOrder.Length; i++)
            {
                if (i < word.LetterOrder.Length - 1)
                {
                    List<int> validNeighbours = getValidNeigbouringIds(word.LetterOrder[i]);

                    valid = valid && validNeighbours.Contains(word.LetterOrder[i + 1]);
                }
            }

            return valid;
        }

        private Tuple<int, int> idToCoord(int id)
        {
            return new Tuple<int, int>(id % 4, (int)Math.Floor(id / 4.0));
        }

        private bool coordIsValid(Tuple<int, int> coord)
        {
            return coord.Item1 >= 0 && coord.Item1 < 4 && coord.Item2 >= 0 && coord.Item2 < 4;
        }

        private int coordToId(Tuple<int, int> coord)
        {
            int id = coord.Item2 * 4;
            id += coord.Item1;

            return id;
        }

        /// <summary>
        /// get valid neighbouring ids
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private List<int> getValidNeigbouringIds(int id)
        {
            Tuple<int, int> coord = idToCoord(id);

            List<int> validIds = new List<int>();
            if (coordIsValid(coord))
            {
                if (coordIsValid(new Tuple<int, int>(coord.Item1 + 1, coord.Item2)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1 + 1, coord.Item2)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1 + 1, coord.Item2 - 1)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1 + 1, coord.Item2 - 1)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1, coord.Item2 - 1)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1, coord.Item2 - 1)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1 - 1, coord.Item2 - 1)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1 - 1, coord.Item2 - 1)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1 - 1, coord.Item2)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1 - 1, coord.Item2)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1 - 1, coord.Item2 + 1)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1 - 1, coord.Item2 + 1)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1, coord.Item2 + 1)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1, coord.Item2 + 1)));
                }
                if (coordIsValid(new Tuple<int, int>(coord.Item1 + 1, coord.Item2 + 1)))
                {
                    validIds.Add(coordToId(new Tuple<int, int>(coord.Item1 + 1, coord.Item2 + 1)));
                }
            }

            return validIds;
        }

        /// <summary>
        /// Calculate the score for the played words
        /// </summary>
        /// <param name="board">board to calculate score for</param>
        private async Task<int> CalculateScore(BoardState board, CancellationToken cancellationToken = default(CancellationToken))
        {
            int score = 0;

            List<WordEntry> words = await context.Words.Where(w => w.BoardId == board.StateId).ToListAsync(cancellationToken);

            foreach (WordEntry word in words)
            {
                switch (word.Word.Length)
                {
                    case 3:
                    case 4:
                        score += 1;
                        break;
                    case 5:
                        score += 2;
                        break;
                    case 6:
                        score += 3;
                        break;
                    case 7:
                        score += 5;
                        break;
                    case int n when (n >= 8 && n <= 16):
                        score += 11;
                        break;
                    default:
                        score += 0;
                        break;
                }
            }

            return score;
        }
    }
}