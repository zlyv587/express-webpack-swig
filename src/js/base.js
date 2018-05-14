/**
 * Created by Lzhang on 2018/2/13.
 */
import deepCopy from 'deepcopy';
console.log('这是大家都需继承的页面');
$(()=> {
  $.ajax({
    url: 'http://localhost:3000/posts',
    dataType: 'json',
    type: 'get',
    success: data => {

      console.log(data);

    },
    error: err => {
      console.log(err);
    }
  });
  // $.ajax({
  //   url: 'http://localhost:3000/posts/1',
  //   dataType: 'json',
  //   type: 'put',
  //   data: {
  //     'title': 'css3',
  //     'author': 'zhangl',
  //   },
  //   success: data => {
  //     console.log(data);
  //   },
  //   error: err => {
  //     console.log(err);
  //   }
  // })
})
