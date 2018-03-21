using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public static class BoardService
    {
        public static char[,] dice =
        {
            {'R', 'I', 'F', 'O', 'B', 'X'},
            {'I', 'F', 'E', 'H', 'E', 'Y'},
            {'D', 'E', 'N', 'O', 'W', 'S'},
            {'U', 'T', 'O', 'K', 'N', 'D'},
            {'H', 'M', 'S', 'R', 'A', 'O'},
            {'L', 'U', 'P', 'E', 'T', 'S'},
            {'A', 'C', 'I', 'T', 'O', 'A'},
            {'Y', 'L', 'G', 'K', 'U', 'E'},
            {'Q', 'B', 'M', 'J', 'O', 'A'},
            {'E', 'H', 'I', 'S', 'P', 'N'},
            {'V', 'E', 'T', 'I', 'G', 'N'},
            {'B', 'A', 'L', 'I', 'Y', 'T'},
            {'E', 'Z', 'A', 'V', 'N', 'D'},
            {'R', 'A', 'L', 'E', 'S', 'C'},
            {'U', 'W', 'I', 'L', 'R', 'G'},
            {'P', 'A', 'C', 'E', 'M', 'D'}
        };

        public static char[] GetNewBoardLayout()
        {
            Random r = new Random();
            char[] boardArray = new char[16];
            for (int i = 0; i < dice.GetLength(0); i++)
            {
                int index = r.Next(0, 6);
                boardArray[i] = dice[i, index];
            }

            return boardArray;
        }
    }
}
