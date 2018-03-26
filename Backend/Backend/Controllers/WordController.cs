using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                    return Ok(board.Words);
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
        public async Task<IActionResult> AddWordToBoard(Guid id, [FromBody]AddWord addWord, CancellationToken cancellationToken)
        {
            if (id != Guid.Empty && ModelState.IsValid)
            {
                BoardState board = await context.BoardStates.FindAsync(new object[] {id}, cancellationToken);
                if (board != null)
                {
                    if (addWord.Word.Length == addWord.Order.Length)
                    {
                        bool valid = true;
                        for (int i = 0; i < addWord.Word.Length; i++)
                        {
                            if (addWord.Word[i] != board.Board[addWord.Order[i]])
                            {
                                valid = false;
                                break;
                            }
                        }

                        return Ok(valid);
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
    }
}