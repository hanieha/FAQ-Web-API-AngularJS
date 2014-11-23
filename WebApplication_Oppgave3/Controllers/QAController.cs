using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Net.Http.Formatting;
using System.Data.Common;
using Web_Api_1;
using Web_Api_1.Models;

namespace WebApi_1
{
  public class QAController : ApiController
  {
    QADB QADb = new QADB();

    // GET api/QA
    public HttpResponseMessage Get()
    {
      List<question> allQuestions = QADb.hentAllQuestions();

      var Json = new JavaScriptSerializer();
      string JsonString = Json.Serialize(allQuestions);

      return new HttpResponseMessage()
      {
        Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
        StatusCode = HttpStatusCode.OK
      };

      /* alternativ til return-koden over - for å forklare dette bedre :
            
      var respons = new HttpResponseMessage();
      respons.Content = new StringContent(JsonString, Encoding.UTF8, "application/json");
      respons.StatusCode = HttpStatusCode.OK;
      return respons;
            
       */

    }

     
    // GET api/QA/5
    public HttpResponseMessage Get(int Qid)
    {
      question enquestion = QADb.hentQuestion(Qid);

      var Json = new JavaScriptSerializer();
      string JsonString = Json.Serialize(enquestion);

      return new HttpResponseMessage()
      {
        Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
        StatusCode = HttpStatusCode.OK
      };
    }

    // POST api/QA
    public HttpResponseMessage Post([FromBody]question innQuestion) //Post(question innQuestion) //
    {
      if (true)//(ModelState.IsValid)
      {
        bool OK = QADb.lagreQuestion(innQuestion);
        if (OK)
        {
          return new HttpResponseMessage()
          {
            StatusCode = HttpStatusCode.OK
          };

        }
      }
      return new HttpResponseMessage()
      {
        StatusCode = HttpStatusCode.NotFound,
        Content = new StringContent("Kunne ikke sette inn Sporsmal ")
      };
    }

    // PUT api/QA/5
    public HttpResponseMessage Put(int Qid, [FromBody]question innQuestion)
    {
      if (true)//(ModelState.IsValid)
      {
        bool OK = QADb.endreQuestion(Qid, innQuestion);
        if (OK)
        {
          return new HttpResponseMessage()
          {
            StatusCode = HttpStatusCode.OK
          };
        }
      }
      return new HttpResponseMessage()
      {
        StatusCode = HttpStatusCode.NotFound,
        Content = new StringContent("Kunne ikke endre sporsmal i DB")
      };

    }

    // DELETE api/QA/5
    public HttpResponseMessage Delete(int Qid)
    {
      bool OK = QADb.slettQuestion(Qid);
      if (!OK)
      {
        return new HttpResponseMessage()
        {
          StatusCode = HttpStatusCode.NotFound,
          Content = new StringContent("Kunne ikke slette")
        };
      }
      return new HttpResponseMessage()
      {
        StatusCode = HttpStatusCode.OK
      };
    }
  }
}