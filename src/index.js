import "./styles.css";
import { HackerNews } from "graphqlhub-schemas";
import { GraphQLSchema, graphql } from "graphql";

document.getElementById("app").innerHTML = [1, 2, 3].map(item => {
  return `
    <div class="news-item">
      <span class="news-item-index">
        1.<span class="news-item-caret"></span>
      </span>
      <div class="news-item-body">
        <p class="news-item-headline">
          Mazda is purging touchscreens from something.
          <span class="news-item-ref">
            (<a href="#">motorauthority</a>)</span
          >
        </p>
        <div class="news-item-details">
          39 points by headalgorithm 48 minutes ago | hide | 20 comments
        </div>
      </div>
    </div>
`;
});

let schema = new GraphQLSchema({
  query: HackerNews.QueryObjectType
});

let query = `{
  hn {
    topStories {
      id, url, title, score, time, timeISO, by{
          id  
        },
        kids {
          id
        },
      }
    }
  }`;

graphql(schema, query)
  .then(res => {
    res.json();
  })
  .catch(err => {
    console.log(err);
  });
