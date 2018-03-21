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
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Board")]
    public class BoardController : Controller
    {
        private readonly BoggleDbContext context;

        public BoardController(BoggleDbContext context)
        {
            this.context = context;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetNewBoard(CancellationToken cancellationToken = default(CancellationToken))
        {
            BoardState board = new BoardState
            {
                Board = BoardService.GetNewBoardLayout()
            };

            await context.BoardStates.AddAsync(board, cancellationToken);

            await context.SaveChangesAsync(cancellationToken);

            return Ok(board);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetBoardById(Guid id)
        {
            if (id != Guid.Empty)
            {
                BoardState bs = await context.BoardStates.FindAsync(id);

                if (bs != null)
                {
                    return Ok(bs);
                }

                return NotFound("The board with the requested id was not found");
            }

            return BadRequest("The given id is not in a valid format");
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteBoardById(Guid id)
        {
            if (id != Guid.Empty)
            {
                BoardState toRemove = await context.BoardStates.FindAsync(id);

                if (toRemove != null)
                {
                    EntityEntry<BoardState> removed = context.BoardStates.Remove(toRemove);
                    return Ok(removed);
                }

                return NotFound("The board with the requested id was not found");
            }

            return BadRequest("The given id is not in a valid format");
        }

    }
}