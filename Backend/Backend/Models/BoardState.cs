using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Backend.Models
{
    /// <summary>
    /// This model defines the way the board state is stored in the database, and how it sould be serialized for external use.
    /// </summary>
    public class BoardState
    {
        [NotMapped]
        private char[] _board;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid StateId { get; set; }
        public double TimeCreated { get; set; }

        [JsonIgnore]
        public List<WordEntry> Words { get; set; }

        /*
         * Used for external communication, can be converted into json
         */
        [NotMapped]
        public char[] Board
        {
            get => _board;
            set
            {
                if (value.Length == 16)
                {
                    _board = value;
                }
                else
                {

                    throw new ArgumentException("Board must be and array of 16 characters");
                }
            }
        }

        /*
         * Used for internal database storage so no new table has to be made.
         */
        [JsonIgnore]
        public string BoardAsString
        {
            get => String.Join("", _board);
            set
            {
                if (value.Length == 16)
                {
                    _board = value.ToCharArray();
                }
                else
                {
                    throw new ArgumentException("The string has to be exactly 16 caracters");
                }
            }
        }

        public int Score { get; set; }
    }
}
