using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Backend.Database;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Controllers
{
    [EnableCors("AllowAll")]
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
                Board = BoardService.GetNewBoardLayout(),
                TimeCreated = DateTime.UtcNow.Subtract(new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc)).TotalMilliseconds
            };

            await context.BoardStates.AddAsync(board, cancellationToken);

            await context.SaveChangesAsync(cancellationToken);

            return Ok(board);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetBoardById(Guid id, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (id != Guid.Empty)
            {
                BoardState bs = await context.BoardStates.FindAsync(new object[] {id}, cancellationToken);

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
        public async Task<IActionResult> DeleteBoardById(Guid id, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (id != Guid.Empty)
            {
                BoardState toRemove = await context.BoardStates.FindAsync(new object[] {id}, cancellationToken);

                if (toRemove != null)
                {
                    EntityEntry<BoardState> removed = context.BoardStates.Remove(toRemove);
                    await context.SaveChangesAsync(cancellationToken);
                    return Ok(removed);
                }

                return NotFound("The board with the requested id was not found");
            }

            return BadRequest("The given id is not in a valid format");
        }

        [Route("{id}/score")]
        [HttpGet]
        public async Task<IActionResult> GetScore(Guid id, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (id != Guid.Empty)
            {
                BoardState board = await context.BoardStates.FindAsync(new object[] {id}, cancellationToken);

                if (board != null)
                {
                    return Ok(board.Score);
                }

                return NotFound("The board with the requested id was not found");
            }

            return BadRequest("The given id is not in a valid format");
        }

    }
}