using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;
using Web_Api_1.Models;

namespace Web_Api_1
{
  public class QADB : IQADB
  {
    QAContext db = new QAContext();

    public List<question> hentAllQuestions()
    {
      List<question> allQuestions = db.Questions.Select(q => new question()
                                {
                                  Qid = q.Qid,
                                  Cid = q.Cid,
                                  Qtext = q.Qtext


                                }).ToList();
      return allQuestions;
    }

    public List<question> hentAllQuestionsByCatId(int catId)
    {
      var allQuestions = from q in db.Questions
                         where q.Cid == catId
                         select new question()
                         {
                           Qid = q.Qid,
                           Cid = q.Cid,
                           Qtext = q.Qtext
                         };

      return allQuestions.ToList();
    }

    public question hentQuestion(int Qid)
    {
      Question enQuestion = db.Questions.Find(Qid);

      var question = new question()
      {
        Qid = enQuestion.Qid,
        Cid = enQuestion.Cid,
        Qtext = enQuestion.Qtext
      };
      return question;
    }

    public bool lagreQuestion(question innQuestion)
    {
      var nyQuestion = new Question
      {
        Qid = innQuestion.Qid,
        Cid = innQuestion.Cid,
        Qtext = innQuestion.Qtext
      };

      Question funnetQid = db.Questions.Find(innQuestion.Qid);
      if (funnetQid == null)
      {

        var nQuestion = new Question
        {
          Qid = innQuestion.Qid,
          Qtext = innQuestion.Qtext

        };
        // legg det inn i den nye kunden
        nyQuestion.Qid = nQuestion.Qid;

      }
      try
      {
        // lagre kunden
        db.Questions.Add(nyQuestion);
        db.SaveChanges();
      }
      catch (Exception feil)
      {
        return false;
      }
      return true;
    }
    public bool endreQuestion(int Qid, question innQuestion)
    {
      // finn question
      Question funnetQuestion = db.Questions.FirstOrDefault(q => q.Qid == Qid);
      if (funnetQuestion == null)
      {
        return false;
      }
      // legg inn ny verdier i denne fra innQuestion
      funnetQuestion.Qid = innQuestion.Qid;
      funnetQuestion.Cid = innQuestion.Cid;
      funnetQuestion.Qtext = innQuestion.Qtext;

      // finn ut om answer finnes fra før
      Answer funnetAnswer = db.Answers.Find(innQuestion.Qid);
      if (funnetAnswer == null)
      {
        // lag Answer
        var nyAnswer = new Answer
        {

          // Aid = innQuestion.Cid,

        };
        // legg det inn i question
        // funnetQuestion.Qid = nyAnswer.Qid;
      }
      try
      {
        // lagre question
        db.SaveChanges();
      }
      catch (Exception feil)
      {
        return false;
      }
      return true;
    }

    public bool slettQuestion(int Qid)
    {
      try
      {
        Question finnQuestion = db.Questions.Find(Qid);
        db.Questions.Remove(finnQuestion);
        db.SaveChanges();
      }
      catch (Exception feil)
      {
        return false;
      }
      return true;
    }
  }
}