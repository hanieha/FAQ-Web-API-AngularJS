using System;
using System.Collections.Generic;
using Web_Api_1.Models;
namespace Web_Api_1
{
    interface IQADB
    {
        bool endreQuestion(int Qid, question innQuestion);
        List<question> hentAllQuestions();
        question hentQuestion(int Qid);
        bool lagreQuestion(question innQuestion);
        bool slettQuestion(int Qid);
    }
}
