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
    [Route("api/Highscore")]
    public class HighscoreController : Controller
    {
        private readonly BoggleDbContext _context;

        public HighscoreController(BoggleDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetHighScores()
        {
            return Ok(_context.Highscores.OrderByDescending(h => h.Score).Take(20).ToList());
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> PostHighScore([FromBody] Highscore highscore, Guid id, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (ModelState.IsValid)
            {
                var highScoreEntry = await _context.Highscores.AddAsync(highscore, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return Ok(highScoreEntry.Entity);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}