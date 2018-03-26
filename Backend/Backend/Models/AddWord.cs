using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class AddWord
    {
        [Required]
        public string Word { get; set; }

        [Required]
        public int[] Order { get; set; }
    }
}
