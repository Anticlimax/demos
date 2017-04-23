var drag = (function(){
  function Drag(){
    this.$app =  $('.box');
    this.init();
    this.bind()
  }

  Drag.prototype.init = function(){
    this.dragable = false;
    this.boxW = this.$app.outerWidth();
    this.boxH = this.$app.outerHeight();
    this.mStartX = '';
    this.mStartY = '';
    this.boxStartLeft = '';
    this.boxStartTop = '';
  }

  Drag.prototype.bind = function(){
    var that = this;

    this.$app.on('mousedown',function(e){
      that.down(e)
    });
    
    $(window).on('mousemove',function(e){
      that.move(e)
    })

    $(window).on('mouseup',function(){
      that.up()
    })
  }

  Drag.prototype.down = function(e){
    this.dragable = true;
    this.mStartX = e.clientX;
    this.mStartY = e.clientY;
    this.boxStartLeft = this.$app.offset().left;
    this.boxStartTop = this.$app.offset().top;

    this.$app.css({
      'cursor': 'move'
    })
  }

  Drag.prototype.move = function(e){
    if (this.dragable){
      var left = e.clientX - this.mStartX + this.boxStartLeft,
          top = e.clientY - this.mStartY + this.boxStartTop,
          right = $(window).width() - this.boxW,
          bottom = $(window).height() - this.boxH

      if(left < 0){
        left = 0
      } else if(left > right){
        left = right
      }
      if(top < 0){
        top = 0
      } else if(top > bottom) {
        top = bottom
      }
    }

    this.$app.css({
      'top': top,
      'left': left
    })
  }

  Drag.prototype.up = function(){
    console.log(1)
    this.dragable = false;
    this.$app.css({
      'cursor': 'default'
    });
  }

  return {
    init: function(){
      new Drag()
    }
  }
})()
drag.init()
