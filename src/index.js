const moment = require('moment');
import {HackerNews} from "graphqlhub-schemas";
import {GraphQLSchema, graphql} from "graphql";

const displayTopStories = (topStories) => {
    let content = '';

    const moreContent = `<div class="news-item">
            <div class="news-item-body news-item-more">
                <a href="#">More</a>
            </div>
        </div>`;

    topStories.forEach((story, index) => {
        content += `
            <div class="news-item">
             
              <div class="news-item-index">
                <span class="news-item-no">${index + 1}.</span> 
                <span class="news-item-caret"></span>
              </div>
              
              <div class="news-item-body">
                
                <p class="news-item-headline">
                  <a href="${story.url}">${story.title}</a>
                  <span class="news-item-ref">
                    (<a href="#">motorauthority</a>)
                    </span>
                </p>
               
                <div class="news-item-details">
                  ${story.score} points by ${story.by.id} ${getMinutes(story.timeISO)} | hide | ${story.descendants} comments
                </div>
              </div>
            </div>`;


    });
    document.getElementById("topStories").innerHTML = content + moreContent

};

const getMinutes = (timeISO) => {
    return moment(timeISO).fromNow();
};

let schema = new GraphQLSchema({
    query: HackerNews.QueryObjectType
});

let query = `{
    topStories(limit: 30) {
      id, url, title, score, time, timeISO, descendants by{
          id  
        },
      }
  }`;

graphql(schema, query)
    .then(res => {
        console.log('worked', res)
        displayTopStories(res.data.topStories);
    })
    .catch(err => {
        console.log(err);
    });


