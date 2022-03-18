export function getNumberOfPosts(data) {
  let postPerMonth = [
    { name: "January", posts: 0 },
    { name: "February", posts: 0 },
    { name: "March", posts: 0 },
    { name: "April", posts: 0 },
    { name: "May", posts: 0 },
    { name: "June", posts: 0 },
    { name: "July", posts: 0 },
    { name: "August", posts: 0 },
    { name: "September", posts: 0 },
    { name: "October", posts: 0 },
    { name: "November", posts: 0 },
    { name: "December", posts: 0 },
  ];
  data.map((post) => {
    let unix_timestamp = parseInt(post.createdAt);
    let date = new Date(unix_timestamp);
    if (date.getFullYear() == 2019) {
      ++postPerMonth[date.getMonth()].posts;
      console.log(date.getMonth(), "month");
    }
  });

  return postPerMonth;
}
