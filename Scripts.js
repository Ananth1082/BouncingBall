document.addEventListener("DOMContentLoaded", function () {
  /****************************************************
   * Two Body Collision
   * 
   * 
   * 
   * 
   * 
   * 
   *****************************************************/
  
  const ball_1 = document.getElementById("ball-1");
  const ball_2 = document.getElementById("ball-2");
  
  function getInitialPosition(ball) {
    let style = getComputedStyle(ball);
    let itemTop = style.getPropertyValue('margin-top');
    let itemLeft = style.getPropertyValue('margin-left'); 
    let inpos = [parseInt(itemLeft), parseInt(itemTop)];
    return inpos;
  }
  
  function getCoordinates(Ball) {
    return [Ball.inpos[0]+Ball.pos[0],Ball.inpos[1]+Ball.pos[1]];
  }
  
  // Ball objects
  let Ball1 = {
    element: ball_1,
    inpos: getInitialPosition(ball_1),
    pos: [0, 0],
    vx: 4,
    vy: 10
  }
  
  let Ball2 = {
    element: ball_2,
    inpos: getInitialPosition(ball_2),
    pos: [0, 0],
    vx: 3,
    vy: -11
  }
  document.getElementById("ball-1").onclick = function () {
    setInterval(function () {
      frame(Ball1);
    }, 10);
  };

  document.getElementById("ball-2").onclick = function () {
    setInterval(function () {
      frame(Ball2);
    }, 10);
  };

  function frame(Ball) {
    Ball.pos[0] += Ball.vx;
    Ball.pos[1] += Ball.vy; 
    Ball.element.style.top = Ball.pos[1] + 'px'; 
    Ball.element.style.left = Ball.pos[0] + 'px';
    let C1=getCoordinates(Ball1);
    let C2=getCoordinates(Ball2);
    let teta=Math.atan((C1[1]-C2[1])/(C1[0]-C2[0]));

    // Adjust these conditions based on the size of the balls
    if (Ball.pos[0] >= 350 - Ball.inpos[0]) // Right-Wall 
    {
      Ball.vx *= -1;
      Ball.vy *= 1;
      Ball.pos[0] = 350 - Ball.inpos[0];
      console.log("Right-Wall");
    }
    if (Ball.pos[1] >= 350 - Ball.inpos[1]) // Bottom-wall
    {
      Ball.vx *= 1;
      Ball.vy *= -1;
      Ball.pos[1] = 350 - Ball.inpos[1]
      console.log("Bottom-Wall");
    }
    if (Ball.pos[0] <= -Ball.inpos[0]) // Left-Wall
    {
      Ball.vx *= -1;
      Ball.vy *= 1;
      Ball.pos[0] = -Ball.inpos[0]
      console.log("Left-Wall");
    }
    if (Ball.pos[1] <= -Ball.inpos[1])
    {
      Ball.vx *= 1;
      Ball.vy *= -1;
      Ball.pos[1] = -Ball.inpos[1]
      console.log("Top-Wall");
    }
    
    if((C1[0]-C2[0])**2+(C1[1]-C2[1])**2<=4*25*25)
      ballCollision(Ball1,Ball2,teta);
    
    
      console.log(Ball.vx, Ball.vy, Ball.pos[0], Ball.pos[1], Ball.inpos, Ball.element.style.top, Ball.element.style.left);
  }
  
  function ballCollision(B1,B2,teta) {
    let P=(B1.vx-B2.vx)*Math.cos(teta)+(B1.vy-B2.vy)*Math.sin(teta);
    Ball1.vx-=(P*Math.cos(teta));
    Ball1.vy-=(P*Math.sin(teta));
    Ball2.vx+=(P*Math.cos(teta));
    Ball2.vy+=(P*Math.sin(teta));

  }});
  /*
  function myMove(elem) {
    const Style= getComputedStyle(elem);
    const itemTop = Style.getPropertyValue('margin-top');
    const itemLeft = Style.getPropertyValue('margin-left'); 
    let inpos = [parseInt(itemLeft),parseInt(itemTop)];//initial position(pos-x,pos-y)
    let pos=[0,0];//relative position with ball at origin
    let vx=Math.floor(10-Math.random() * 20),vy=Math.floor(10-Math.random() * 20);//velocity
    setInterval(frame, 10);
  
    function frame() {
      pos[0]+=vx;
      pos[1]+=vy; 
      elem.style.top = pos[1] + 'px'; 
      elem.style.left = pos[0] + 'px';
      if (pos[0]>=350-inpos[0])//Left-Wall 
      {
        vx*=-1,vy*=1;
        console.log("Right-Wall");
      }
      if(pos[1]>=350-inpos[1])//Bottom-wall
      {
        vx*=1,vy*=-1;
        console.log("Bottom-Wall");
      }
      if(pos[0]<=-inpos[0])//
      {
        vx*=-1,vy*=1;
        console.log("Top-Wall");
      }
      if(pos[1]<=-inpos[1])
      {
        vx*=1,vy*=-1;
        console.log("Left-Wall");
      }
      if((inpos[0]+pos[0])*(inpos[0]+pos[0])+(inpos[1]+pos[1])*(inpos[1]+pos[1])<=4*50*50)
      console.log("Hit!!!!!!!");
      console.log(vx,vy,pos[0],pos[1],inpos,"  ",elem.style.top,"   ",elem.style.left);
    }
  }

*/
