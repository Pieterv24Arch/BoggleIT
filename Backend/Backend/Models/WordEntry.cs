using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Backend.Models
{
    /// <summary>
    /// This class definese a word entry both in the database as for serialization for external use.
    /// </summary>
    public class WordEntry
    {
        [NotMapped]
        private int[] _letterOrder;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid WordId { get; set; }

        [Required]
        public string Word { get; set; }

        /*
         * Used for external communication, can be converted into json
         */
        [Required]
        [NotMapped]
        public int[] LetterOrder
        {
            get
            {
                if (_letterOrder != null)
                {
                    return _letterOrder;
                }
                return new int[0];
            }
            set { _letterOrder = value; }
        }

        /*
         * Used for internal database storage so no new table has to be made.
         */
        [JsonIgnore]
        public string LetterOrderAsString
        {
            get
            {
                if (_letterOrder != null)
                {
                    return String.Join(',', _letterOrder);
                }
                else
                {
                    return "";
                }
            }
            set
            {
                string[] stringLetterorder = value.Split(',');
                int[] newLetterorder = new int[stringLetterorder.Length];
                for (int i = 0; i < stringLetterorder.Length; i++)
                {
                    if (int.TryParse(stringLetterorder[i], out int letterCoord))
                    {
                        newLetterorder[i] = letterCoord;
                    }
                    else
                    {
                        throw new ArgumentException($"the string: {stringLetterorder} could not be parsed");
                    }
                }

                _letterOrder = newLetterorder;
            }
        }

        // Entries for DB relationships
        [JsonIgnore]
        public BoardState BoardState { get; set; }

        public Guid BoardId { get; set; }
    }
}
