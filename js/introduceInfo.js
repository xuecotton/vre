layui.use(
  [
    "jquery",
    "element",
    "laydate",
    "upload",
    "table",
    "laypage",
    "layer",
    "carousel",
    "form",
    "laytpl"
  ],
  function() {
    var element = layui.element;
    var table = layui.table;
    var laydate = layui.laydate;
    var table = layui.table;
    var $ = layui.jquery;
    var upload = layui.upload;
    var layer = layui.layer;
    var laydate = layui.laydate;
    var laypage = layui.laypage;
    var carousel = layui.carousel;
    var form = layui.form;
    var laytpl = layui.laytpl;
    
    $(".li_title").on("click", function() {
      $(this)
        .addClass("lib_title")
        .parent()
        .siblings()
        .children()
        .removeClass("lib_title");
    });
    
    $(".liat_a").on("click", function() {
      $(this)
        .addClass("a_active")
        .parent()
        .siblings()
        .children()
        .removeClass("a_active");
    });

    /**
     * 互动答疑
     */
    $(".question_area").focus(function() {
      $(".question_area").val("");
    });
    $(".q_btn").on("click", function() {
      var q_str = $(".question_area").val();
      console.log(q_str);
      var qes_str =
        `
        <div class="question">
          <div class="qa_pic">
            <img class="qa_icon" src="./img/my_head.png" alt="">
            <span>学生</span>
          </div>
          <span class="qa_text">` +
        q_str +
        `</span>
        </div>
      `;
      if (q_str) {
        $(".qa").append(qes_str);
        $(".question_area").val("");
      } else {
        layer.msg(
          "请输入信息",
          {
            icon: 0,
            time: 1000
          },
          function() {
            //do something
          }
        );
      }
    });

    /**
     * 在线测试
     */
    $(".test_submit_btn").on("click", function() {
      
      if (
        $('.test_area_seven').val() 
        ) {
        layer.msg(
          "答对了5道题,获得50分！",
          {
            icon: 1,
            time: 1000
          },
          function() {
            //do something
          }
        );
      }else{
        layer.msg(
          "请先答题！",
          {
            icon: 0,
            time: 1000
          },
          function() {
            //do something
          }
        );
      }
    });
  }
);
