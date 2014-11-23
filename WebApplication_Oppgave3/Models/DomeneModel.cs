using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web_Api_1.Models
{
    public class question
    {  
        public int Qid { get; set; }
        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ. \\-]{2,30}$")]
        public string Qtext { get; set; }
        [Required]
       // [RegularExpression("^[a-zøæåA-ZØÆÅ.0-9 \\-]{2,30}$")]
        public int Cid { get; set; }

       
    }
}