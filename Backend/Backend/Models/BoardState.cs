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
    public class BoardState
    {
        private char[] _board;
        private List<string> _words = new List<string>();

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }

        public int Score { get; set; }

        [NotMapped]
        public char[] Board
        {
            get => _board;
            set => _board = value;
        }

        [NotMapped]
        public List<string> Words
        {
            get => _words;
            set => _words = value;
        }

        [JsonIgnore]
        public string BoardAsString
        {
            get
            {
                if (_board != null && _board.Length > 0)
                {
                    return string.Join("", _board);
                }
                else
                {
                    return "";
                }
            }

            set
            {
                if (value.Length == 16)
                {
                    _board = value.ToCharArray();
                }
                else
                {
                    throw new ArgumentException("The string must be 16 characters long");
                }
            }
        }

        [JsonIgnore]
        public string WordsAsString
        {
            get
            {
                if (_words != null && _words.Count > 0)
                {
                    return string.Join(',', _words);
                }
                else
                {
                    return null;
                }
            }

            set
            {
                if (!String.IsNullOrEmpty(value))
                {
                    _words = value.Split(',').ToList();
                }
            }
        }
    }
}
