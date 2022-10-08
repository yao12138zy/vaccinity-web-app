export const getArticles = (app) => {
  // Create our request constructor with all the parameters we need
  // const request = new Request("/articles", {
  //   method: "get",
  //   headers: {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json",
  //   },
  // });
  // Send the request with fetch()
  const url = "/articles";
  fetch(url)
    .then((res) => {
      // res.send(res)
      if (res.status === 200) {
        // app.setState({ article: res.text() });
        return res.json();
      }
      else {
        alert("Can't get articles");
      }
    }).then((article) => {
      // console.log(article);
      app.setState({ article: article });
    })
    .catch((error) => {
      console.log(error);
    });
};


export const getOneArticle = (app, id) => {
  console.log(id)
  const url = `/articles/${id}`;
  fetch(url)
    .then((res) => {
      // res.send(res)
      if (res.status === 200) {
        // app.setState({ article: res.text() });
        return res.json();
      }
    }).then((article) => {
      console.log(article);
      app.setState({ article: article });
    })
    .catch((error) => {
      console.log(error);
    });
};



export const updateArticle = (app, artpage, id, article) => {
  const url = `/articles/${id}`;
  // console.log(`updateArticle id: ${id}`);
  // console.log(`article.state.title1: ${article.state.title1}`);
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify(article.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {

      if (res.status === 200) {
        // app.setState({article: res});
        // console.log(res);
        return res.json();
      }
      else {
        alert("Update Failed")
      }
    }).then(json => {
      if (json) {
        // this is list of articles from home state
        const List = app.state.article;
        List.map(each => {
          if (each._id === json._id) {
            // set the article to what's in database?
            each = json;
          }
        })
        app.setState({ article: List })
        // artpage.setState({article:List})
        alert("Successful update")
      }
      else {
        alert("Update Failed")
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
export const addNewArticle = (addPage,all) => {
  const article_url = "/articles";
  console.log(all.state);


  const request = new Request(article_url, {
    method: "post",
    body: JSON.stringify(addPage.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request).then(res => {
    if (res.status === 200) {
      console.log("good");
      return res.json();
    }
  }).then(article =>{
    const newList = all.article;
    newList.push(article)
    all.setState({articles:newList})
   
  })

.catch((error) => {
  console.log(error);
});

}