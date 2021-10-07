const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
//console.log($siteList)如果控制台出现了0：ul.siteList说明找对了，这里的0是伪数组
const x = localStorage.getItem('x') //从本地的储存里面读取储存数值后
const xObject = JSON.parse(x) //把字符串变成对象,对应 

const hashMap = xObject|| [
    {logo:'A', url:'https://www.acfun.cn'},
    {logo:'B', url:'https://www.bilibili.com'},
];  
//因为用了Prompt，所以不能定义hashMap，不用担心会被污染;logoType:'text'

const simplifyUrl = (url)=>{
    return url.replace('https://', '')
              .replace('http://','')
              .replace('www','')
              .replace(/\/.*/,'')
} //simplifyUrl = removeX;/.*是/连接后面那些东西变空,删除 /开头的内容

const render = ()=>{
  $siteList.find('li:not(.last)').remove() //除了最后一项，全部清空，不然新增网址，会附带前面的网址，重复
  //渲染之前把之前删掉，再渲染新的
  hashMap.forEach((node, index) => {  //forEach会给你两个参数，一个是当前参数，一个是下标
      //console.log(index);
    const $li = $(`<li>
        <div class="site">    
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class='close'> 
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
        </div> 
    </li>`).insertBefore($lastLi);
    $li.on('click', ()=>{
        window.open(node.url)
    })
    $li.on('click', '.close', (e)=>{
        console.log('这里执行了') //调查哪里出问题，这里执行正常
        e.stopPropagation()//监听close的工具组，阻止冒泡:event.stopPropagation()
        console.log(hashMap)
        hashMap.splice(index, 1) //数组里面删除是用splice
        render()
       })
    }) 
}

render()

$('.addButton').on('click',()=>{
      let url = window.prompt('请问你要添加的网址是啥？')
      //const赋值是唯一的，所有改成用let
      //console.log(1)调试大法，看是否有正常运行
      //console.log(url) //测试url是否等于用户输入的网址
      if(url.indexOf('http')!==0){
          url = 'https://' + url //alert('请输入http开头的网址')
      }
      console.log(url)
      hashMap.push({
          logo:simplifyUrl(url)[0].toUpperCase(),
          //logoType:'text',
          url:url
      }); //toUpperCase()是把首字母改成大写字母
     render()
      //const $li = $(`<li>
        //<a href="${url}">   
            //<div class="site">    
            //<div class="logo">${url[8]}</div> 
            //<div class="link">${url}</div>
           // </div>
        //</a> 
     // </li>`).insertBefore($lastLi)
      //这里的``是反引号，再tap上面那个键,新增空白卡片;${url}插值法；${url[0]网址的第一个字符}
  })

  window.onbeforeunload = () =>{
      //console.log('页面要关闭了')控制台设置选择preserve log，就可以看的这句话了
      const string = JSON.stringify(hashMap)//JSON.stringify可以把对象变成字符串
      //console.log(typeof hashMap)
      //console.log(hashMap)
      //console.log(typeof string) //查看类型
      //console.log(string)//变成字符串就可以储存
      localStorage.setItem('x', string) //这里省略了window，是全局变量，括号里面（key,value）
      //在本地的储存里面设置一个x，它的值就是这个string
  }

  //document.addEventListener等同于下面那句话
  $(document).on('keypress', (e) =>{
      //const key = e.key 当key与e.key是一样的，就可以简写成以下代码：
      const {key} = e
      for(let i=0;i<hashMap.length;i++){
          if(hashMap[i].logo.toLowerCase() === key){ 
              //当hashmap的第i个的logo的小写后 等于 key这个值，
              window.open(hashMap[i].url)
              //说明用户找的就是这个，然后打开这个网址
          }
      }
  })