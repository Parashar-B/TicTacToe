var n=0;            // ===========  number of board space occupied( for play with friend)
var m=0;            // =========== number of board space occupied( for play with computer)
var s=0;            // ===========  swap variable ( 0 for non-swap )
var gm=0;          // =========== game mode variable ( 0 for Computer Mode )
var scX=0;        // ===========  to store score of X
var scO=0;        // ===========  to store score of O
var XLVI=0;          // =========== index of last value in the XT array
var OLVI=0;         //  =========== index of last value in the OT array
var XT=[ ];       // array to hold the occupied X position in board
var OT=[ ];       // array to hold the occupied O position in board
var predict;

/* ============= game board( decide game mode) ============= */

function clicked(l)
{  
   if(gm==0)
      auto_mode(l);
   else
      manual_mode(l);

}
/*================= auto mode ================*/
function auto_mode(k)
{
   var f;
   x=document.getElementById(k);
   if(s==0)
   {
      x.style.transition="opacity 0s";
      x.style.opacity="1";
      x.innerHTML="X";
      x.disabled=true; // ========= dissable the clicked board button
      XT[parseInt(k)-1]='X';              // =============== input in XT array
      if(parseInt(k)>XLVI)
        XLVI=parseInt(k);
      hide_X(document.getElementById("tx"));
      m++;
      f=check_XT();
      if(f==0)
        return;
      if(m>8)
      { Draw(); return}
      show_O(document.getElementById("to"));
   }
   else
   {
      x.style.transition="opacity 0s";
      x.style.opacity="1";
      x.innerHTML="O";
      x.disabled=true; // ========= dissable the clicked board button
      OT[parseInt(k)-1]="Y";              // =============== input in XT array
      if(parseInt(k)>OLVI)
        OLVI=parseInt(k);
      hide_O(document.getElementById("to"));
      m++;
      f=check_OT();
      if(f==0)
        return;
      if(m>8)
      { Draw(); return}
      show_X(document.getElementById("tx"));
   }
   document.getElementById("swap").style.visibility="hidden";  // ========= to hide the swap option
   
     // to disable the Game Mode change butto
     gm_disable();

   setTimeout(function(){auto_play()},400); // computer's turn
}

/*================= manual mode =============== */

function manual_mode(j)
{
   var f;
   x=document.getElementById(j);
   if( !( (n+s)%2 ) )
   { x.style.transition="opacity 0.5s";
     x.style.opacity="1";
     x.innerHTML="X";
     x.disabled=true; // ========= dissable the clicked board button
     XT[parseInt(j)-1]="X";              // =============== input in XT array
     if(parseInt(j)>XLVI)
        XLVI=parseInt(j);
    if(XT.length>2)
        f=check_XT();
       if(f==0)
          return; 
      show_O(document.getElementById("to"));
      hide_X(document.getElementById("tx"));
      n++;
    }
   else
   { x.style.transition="opacity 0.5s";
     x.style.opacity="1";
     x.innerHTML="O";
     x.disabled=true;
     OT[parseInt(j)-1]="Y";                          // ========== input in OT array
   if(parseInt(j)>OLVI)
        OLVI=parseInt(j);
    if(OT.length>2)
       f=check_OT();
    if(f==0)
       return;
     show_X(document.getElementById("tx"));
     hide_O(document.getElementById("to"));
     n++;}
     document.getElementById("swap").style.visibility="hidden";  // ========= to hide the swap option
   
     // to disable the Game Mode change butto
     gm_disable();

    if(n>=9)
       Draw();  //  to handle the Draw output
}
/*=================== turn handling ============= */

function show_O(z)                   
{ if(gm==0)
   {
      if(m>8)
        return;
      else
      { z.style.transition="left 0.4s";
        z.style.visibility="visible"; 
        z.style.left="930";
      }
   }
   else
   { if(n>=8)
      return;
     else
     { z.style.transition="left 0.4s";
      z.style.visibility="visible"; 
      z.style.left="930"; }  
   }
 }

function hide_O(i)
{ i.style.transition="left 0.4s";
  i.style.left="850"; }

function show_X(m)
{  if(gm==0)
   {
      if(m>8)
        return;
      else
        {
         m.style.transition="left 0.4s";
         m.style.visibility="visible";
         m.style.left="370"; 
        }
   }
   else
   { if(n>=8)
      return;
    else
     { m.style.transition="left 0.4s";
       m.style.visibility="visible";
       m.style.left="370"; 
      }
   }
}

function hide_X(h)
{ h.style.transition="left 0.4s";
  h.style.left="450"; }

/* ================  swap method ============ */
function swap()
{ 
   var t;
   if(s==0)
   { show_O(document.getElementById("to"));
     hide_X(document.getElementById("tx"));
     s=1;
     // swaping of score
     t=scX;
     scX=scO;
     scO=t;
     document.getElementById("scX").innerHTML=scX;
     document.getElementById("scO").innerHTML=scO;
     }
   else
    { show_X(document.getElementById("tx"));
      hide_O(document.getElementById("to"));
      s=0;
      // swaping of score
     t=scX;
     scX=scO;
     scO=t;
     document.getElementById("scX").innerHTML=scX;
     document.getElementById("scO").innerHTML=scO; }
}

/*=================== Game Mode option =============== */
function game_mode(i)
{
   scX=0;
   scO=0;
   document.getElementById("scX").innerHTML=scX;
   document.getElementById("scO").innerHTML=scO;
   var x=i.value;
   if(x=="F")
    { gm=1; // mode variable value change 
      document.getElementById("fi").style.backgroundColor="#4BCFFA";
      document.getElementById("fi").style.border="3px solid #4BCFFA";
      document.getElementById("fi").style.top="14";
      document.getElementById("ci").style.backgroundColor="#9babbb";
      document.getElementById("ci").style.border="none";
      document.getElementById("ci").style.top="16"; }
      //document.getElementById("sl").style.visibility="hidden";
   else if(x="C")
    { gm=0;  // mode variable value change
      document.getElementById("ci").style.backgroundColor="#4BCFFA";
      document.getElementById("ci").style.border="3px solid #4BCFFA";
      document.getElementById("ci").style.top="14";
      document.getElementById("fi").style.backgroundColor="#9babbb";
      document.getElementById("fi").style.border="none";
      document.getElementById("fi").style.top="16"; }
      //document.getElementById("sl").style.visibility="visible"; 
}

// enable game mode button
function gm_enable()
{
   document.getElementsByClassName("rb")[0].disabled=false;
   document.getElementsByClassName("rb")[1].disabled=false;
}

// disable game mode button

function gm_disable()
{
   document.getElementsByClassName("rb")[0].disabled=true;
   document.getElementsByClassName("rb")[1].disabled=true;
}

/*
// button animated function
function animate(e)
{
   if(gm == 0 && e.id !="ci")
   {
      alert(e.id);
      document.getElementById("fi").style.backgroundColor="#80dcfa";
   }
}
*/

/* ================= Game Level select ============*/
//function gm_Level()
//{
  //alert("Ho");
//}

/* =================== on load============== */

function glow()
{
    var t = document.getElementById("tx");
    var h = document.getElementsByTagName("h3")[0];
    var sx = document.getElementById("stx");
    var so= document.getElementById("sto");
    var gt= document.getElementById("lt");
    t.style.transition="left 1.5s";
    t.style.left="370";
    h.style.transition="top 1.5s";
    h.style.top="0";
    sx.style.transition="top 1.5s";
    sx.style.top="120";
    so.style.transition="top 1.5s";
    so.style.top="120";
   gt.style.transition="opacity 2s";
   gt.style.opacity="1";
   mode_check();
}

function mode_check()  // to set the play with computer mode
{
   document.getElementById("cr").checked="True";
}
/*================ Game ( Computer Mode )================*/
function auto_play()
{ 
   if(m>2)
   {  var t;
       if(s==0)
        t=Check_win_X(); // to win against X
       else
        t=Check_win_O(); // to win against O
      if(t==4)
        {m++; return;}
      else
      {   if(s==0)
           Counter_predic_X(); // to counter the X from wining
          else
           Counter_predic_O(); // to counter the O from wining
      }
   } 
   else
   {  
      if(s==0)
       gen_random_X(); // to generate random O( if the user is X)
      else
       gen_random_O(); // to generate random X( if the user is O)
   }
   m++;
   if(s==0)
   { setTimeout(function(){show_X(document.getElementById("tx"))},800);
     setTimeout(function(){hide_O(document.getElementById("to"))},800);
   }
   else
   {
    setTimeout(function(){show_O(document.getElementById("to"))},800);
    setTimeout(function(){hide_X(document.getElementById("tx"))},800);
   }
}

// function to draw occupied symbol
function draw_X(i)
{
   document.getElementById(i.toString()).style.transition="opacity 1s";
   document.getElementById(i.toString()).style.opacity="1";
   document.getElementById(i.toString()).style.transitionDelay="0.5s";
   document.getElementById(i.toString()).style.transitionTimingFunction="cubic-bezier(0.80, 0,1,1);";
   document.getElementById(i.toString()).innerHTML="X";
   document.getElementById(i.toString()).disabled=true;
   XT[i-1]="X";
   if(i>XLVI)
        XLVI=i;
}
function draw_O(i)
{
   document.getElementById(i.toString()).style.transition="opacity 0.7s";
   document.getElementById(i.toString()).style.opacity="1";
   document.getElementById(i.toString()).style.transitionDelay="0.5s";
   document.getElementById(i.toString()).style.transitionTimingFunction="cubic-bezier(0.80, 0,1,1);";
   document.getElementById(i.toString()).innerHTML="O";
   document.getElementById(i.toString()).disabled=true;
   OT[i-1]="Y";
   if(i>OLVI)
        OLVI=i;

}

// to generate random place for Computer
function gen_random_X()
{
   var r;
   do{r=Math.floor(Math.random() * 10);
    }while(XT[r-1]=="X" || OT[r-1]=="Y" || r==0)
   draw_O(r);
}
function gen_random_O()
{
   var r;
   do{r=Math.floor(Math.random() * 10);
    }while(XT[r-1]=="X" || OT[r-1]=="Y" || r==0)
   draw_X(r);
}

// ====================== predict functions to block the User (if user is X)
function Counter_predic_X()
{
   var i;
   var j;
   var fst;
   var snd;
   var r=0;
   for(i=0;i<XLVI;i++)
   {  if( XT[i] =='X')
        {  fst=i+1;
            for(j=i+1;j<XLVI;j++)
            {  //alert("j = "+j);
               if( XT[j] =='X')
                 { snd=j+1;
                    if(fst%3!=0)
                     r=horiz_X(fst,snd); // check if numbers are horizontal
                     //alert("HR : "+r);
                     if(r==1)
                       break;
                     //alert("Got");
                     r=verti_X(fst,snd); // check if numbers are vertical
                     //alert("VR : "+r);
                     if(r==1)
                       break;
                     if((fst%2!=0 && snd%2!=0) && (fst!=3 && fst!=7))
                      r=diagon_4_X(fst,snd); // check if numbers are diagonal( for difference 4 )
                       //alert("Dia 4r : "+r);
                     if(r==1)
                       break;
                       if((fst%2!=0 && snd%2!=0) && (fst!=1 && snd!=9))
                       r=diagon_2_X(fst,snd);  // check if numbers are diagonal( for difference 4 )
                       //alert("Dia 2r : "+r);
                     if(r==1)
                        break;
                     else if(r==2)
                         continue;
                 }
            }
        }
      if(r==1)
        break;
      r=0; // for no prediction found
   }
   if(r==0) 
    gen_random_X();
}

// horizontal function
function horiz_X(f,s)
{ 
   d=s-f; // to calculate difference
   if(d==2 && (s!=4 && s!=5 && s!=7))
     { predict=f+1; 
       if(OT[predict-1]=="Y")   // to check if predict value already assigned
           return 2;
      draw_O(predict);
      return 1; }
   else if(d==1 && (s%3==0))
         { predict=f-1;
            if(OT[predict-1]=="Y")
               return 2;
           draw_O(predict);
            return 1; }
   else if(d==1)
         { predict=s+1;
            if(OT[predict-1]=="Y")
               return 2;
            draw_O(predict);
            return 1; }
      return 0; // to indicate that numbers are not HOrizontal
}

// vertical function
function verti_X(f,s)
{
  d=s-f;
  if(d==6)
    {
      predict=f+3;
      if(OT[predict-1]=="Y")
               return 2;
      draw_O(predict);
      return 1;
    }
   else if(d==3 && (f>1 && f>2 && f>3))
        {
           predict=f-3;
           if(OT[predict-1]=="Y")
               return 2;
            draw_O(predict);
            return 1;
        }
   else if(d==3)
         {
            predict=s+3;
            if(OT[predict-1]=="Y")
               return 2;
            draw_O(predict);
            return 1;
         }
      return 0;
}

// diagonal function (for difference 4)
function diagon_4_X(f,s)
{
   d=s-f;
   if(d==8)
   {
      predict=f+4;
      if(OT[predict-1]=="Y")
         return 2;
      draw_O(predict);
      return 1;
   }
   else if(d==4 && f!=1)
   {
      predict=f-4;
      if(OT[predict-1]=="Y")
         return 2;
      draw_O(predict);
      return 1;
   }
   else if(d==4)
   {
      predict=s+4;
      if(OT[predict-1]=="Y")
         return 2;
      draw_O(predict);
      return 1;
   }
  return 0;
}

// diagonal function (for difference 2)
function diagon_2_X(f,s)
{
   d=s-f;
   if(d==4)
   {
      predict=f+2;
      if(OT[predict-1]=="Y")
         return 2;
      draw_O(predict);
      return 1;
   }
   else if(d==2 && f!=3)
   {
      predict=f-2;
      if(OT[predict-1]=="Y")
         return 2;
      draw_O(predict);
      return 1;
   }
   else if(d==2)
   {
      predict=s+2;
      if(OT[predict-1]=="Y")
         return 2;
      draw_O(predict);
      return 1;
   }
   return 0;
}

// ====================== predict functions to block the User (if user is O)
function Counter_predic_O()
{
   var i;
   var j;
   var fst;
   var snd;
   var r=0;
   for(i=0;i<OLVI;i++)
   {  if( OT[i] =='Y')
        {  fst=i+1;
            for(j=i+1;j<OLVI;j++)
            {  if( OT[j] =='Y')
                 { snd=j+1;
                     if(fst%3!=0)
                     r=horiz_O(fst,snd); // check if numbers are horizontal
                     if(r==1)
                       break;
                     r=verti_O(fst,snd); // check if numbers are vertical
                     if(r==1)
                       break;
                       if((fst%2!=0 && snd%2!=0) && (fst!=3 && fst!=7))
                       r=diagon_4_O(fst,snd);  // check if numbers are diagonal( for difference 4 )
                     if(r==1)
                       break;
                       if((fst%2!=0 && snd%2!=0) && (fst!=1 && snd!=9))
                       r=diagon_2_O(fst,snd);  // check if numbers are diagonal( for difference 4 )
                     if(r==1)
                        break;
                     else if(r==2)
                        continue;
                 }
            }
        }
      if(r==1)
         break;
      r=0; // for no prediction found
   }
   if(r==0) 
    gen_random_O();
}

// horizontal function
function horiz_O(f,s)
{ 
   d=s-f; // to calculate difference
   if(d==2 && (s!=4 && s!=5 && s!=7))
     { predict=f+1; 
       if(XT[predict-1]=="X")   // to check if predict value already assigned
           return 2;
      draw_X(predict);
      return 1; }
   else if(d==1 && (s%3==0))
         { predict=f-1;
            if(XT[predict-1]=="X")
               return 2;
               draw_X(predict);
            return 1; }
   else if(d==1)
         { predict=s+1;
            if(XT[predict-1]=="X")
               return 2;
               draw_X(predict);
            return 1; }
      return 0; // to indicate that numbers are not HOrizontal
}

// vertical function
function verti_O(f,s)
{
  d=s-f;
  if(d==6)
    {
      predict=f+3;
      if(XT[predict-1]=="X")
               return 2;
               draw_X(predict);
      return 1;
    }
   else if(d==3 && (f>1 && f>2 && f>3))
        {
           predict=f-3;
           if(XT[predict-1]=="X")
               return 2;
               draw_X(predict);
            return 1;
        }
   else if(d==3)
         {
            predict=s+3;
            if(XT[predict-1]=="X")
               return 2;
               draw_X(predict);
            return 1;
         }
      return 0;
}

// diagonal function (for difference 4)
function diagon_4_O(f,s)
{
   d=s-f;
   if(d==8)
   {
      predict=f+4;
      if(XT[predict-1]=="X")
         return 2;
         draw_X(predict);
      return 1;
   }
   else if(d==4 && f!=1)
   {
      predict=f-4;
      if(XT[predict-1]=="X")
         return 2;
         draw_X(predict);
      return 1;
   }
   else if(d==4)
   {
      predict=s+4;
      if(XT[predict-1]=="X")
         return 2;
         draw_X(predict);
      return 1;
   }
  return 0;
}

// diagonal function (for difference 2)
function diagon_2_O(f,s)
{
   d=s-f;
   if(d==4)
   {
      predict=f+2;
      if(XT[predict-1]=="X")
         return 2;
         draw_X(predict);
      return 1;
   }
   else if(d==2 && f!=3)
   {
      predict=f-2;
      if(XT[predict-1]=="X")
         return 2;
         draw_X(predict);
      return 1;
   }
   else if(d==2)
   {
      predict=s+2;
      if(XT[predict-1]=="X")
         return 2;
         draw_X(predict);
      return 1;
   }
   return 0;
}

// ========================= to check if Computer can win ( if the user is X )
function Check_win_X()
{
   var i;
   var j;
   var fst;
   var snd;
   var r=0;
   for(i=0;i<OLVI;i++)
   {  if( OT[i] =='Y')
        {  fst=i+1;
            for(j=i+1;j<OLVI;j++)
            {  if( OT[j] =='Y')
                 { snd=j+1;
                  if(fst%3!=0)
                   r=horiz_win_O(fst,snd); // check if numbers are horizontal
                   //alert("HR : "+r);
                   if(r!=0)
                     {B_disable();O_win(fst,snd,r); return 4;}
                   r=verti_win_O(fst,snd); // check if numbers are vertical
                   //alert("VR : "+r);
                   if(r!=0)
                    {B_disable();O_win(fst,snd,r); return 4;}
                    if((fst%2!=0 && snd%2!=0) && (fst!=3 && fst!=7))
                    r=diagon_4_win_O(fst,snd);  // check if numbers are diagonal( for difference 4 )
                    //alert("D4R : "+r);
                    if(r!=0)
                     {B_disable();O_win(fst,snd,r); return 4;}
                  if((fst%2!=0 && snd%2!=0) && (fst!=1 && snd!=9))
                     r=diagon_2_win_O(fst,snd);  // check if numbers are diagonal( for difference 4 )
                     //alert("D2R : "+r);
                   if(r!=0)
                      {B_disable();O_win(fst,snd,r); return 4;}
                 }
            }
        }
   }    
}

// horizontal win function 
function horiz_win_O(f,s)
{
   d=s-f;
   if(d==2 && (s!=4 && s!=5 && s!=7))
     { predict=f+1; 
       if(XT[predict-1]!="X" && OT[predict-1]!="Y")
         { draw_O(predict);
           return predict; }
     }
   else if(d==1 && (s%3==0))
         { predict=f-1;
            if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
              return predict; }
         }
   else if(d==1)
         { predict=s+1;
            if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
              return predict; }
         }
      return 0; // to indicate that numbers are not HOrizontal
}

// vertical win function
function verti_win_O(f,s)
{
   d=s-f;
   if(d==6)
     { predict=f+3;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
      { draw_O(predict);
        return predict; }
     }
    else if(d==3 && (f>1 && f>2 && f>3))
         { predict=f-3;
            if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
              return predict; }
         }
    else if(d==3)
          { predict=s+3;
            if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
             return predict; }
          }
       return 0;
}

// diagonal win function (for difference 4)
function diagon_4_win_O(f,s)
{
   d=s-f;
   if(d==8)
   {  predict=f+4;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
             return predict; }
   }
   else if(d==4 && f!=1)
   { predict=f-4;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
             return predict; }
   }
   else if(d==4)
   { predict=s+4;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
             return predict; }
   }
  return 0;
}

//diagonal win function ( for difference 2 )
function diagon_2_win_O(f,s)
{
   d=s-f;
   if(d==4)
   { predict=f+2;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
      { draw_O(predict);
       return predict; }
   }
   else if(d==2 && f!=3)
   { predict=f-2;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
             return predict; }
   }
   else if(d==2)
   { predict=s+2;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_O(predict);
             return predict; }
   }
   return 0;
}

// ========================= to check if Computer can win ( if the user is O )
function Check_win_O()
{
   var i;
   var j;
   var fst;
   var snd;
   var r=0;
   for(i=0;i<XLVI;i++)
   {  if( XT[i] =='X')
        {  fst=i+1;
            for(j=i+1;j<XLVI;j++)
            {  if( XT[j] =='X')
                 { snd=j+1;
                  if(fst%3!=0)
                   r=horiz_win_X(fst,snd); // check if numbers are horizontal
                   if(r!=0)
                     {B_disable();X_win(fst,snd,r); return 4;}
                   r=verti_win_X(fst,snd); // check if numbers are vertical
                   if(r!=0)
                    {B_disable();X_win(fst,snd,r); return 4;}
                    if((fst%2!=0 && snd%2!=0) && (fst!=3 && fst!=7))
                    r=diagon_4_win_X(fst,snd);  // check if numbers are diagonal( for difference 4 )
                    if(r!=0)
                     {B_disable();X_win(fst,snd,r); return 4;}
                     if((fst%2!=0 && snd%2!=0) && (fst!=1 && snd!=9))
                       r=diagon_2_win_X(fst,snd);  // check if numbers are diagonal( for difference 4 )
                   if(r!=0)
                      {B_disable();X_win(fst,snd,r); return 4;}
                 }
            }
        }
   }
}

// horizontal win function 
function horiz_win_X(f, s) 
{
   d = s - f;
   if (d == 2 && (s != 4 && s != 5 && s != 7)) {
      predict = f + 1;
      if (XT[predict - 1] != "X" && OT[predict - 1] != "Y") {
         draw_X(predict);
         return predict;
      }
   }
   else if (d == 1 && (s % 3 == 0)) {
      predict = f - 1;
      if (XT[predict - 1] != "X" && OT[predict - 1] != "Y") {
         draw_X(predict);
         return predict;
      }
   }
   else if (d == 1) {
      predict = s + 1;
      if (XT[predict - 1] != "X" && OT[predict - 1] != "Y") {
         draw_X(predict);
         return predict;
      }
   }
   return 0; // to indicate that numbers are not HOrizontal
}

// vertical win function
function verti_win_X(f,s)
{
   d=s-f;
   if(d==6)
     { predict=f+3;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
         { draw_X(predict);
           return predict; }
     }
    else if(d==3 && (f>1 && f>2 && f>3))
         { predict=f-3;
            if(XT[predict-1]!="X" && OT[predict-1]!="Y")
          { draw_X(predict);
           return predict; }
         }
    else if(d==3)
          { predict=s+3;
            if(XT[predict-1]!="X" && OT[predict-1]!="Y")
           { draw_X(predict);
           return predict; }
         }
       return 0;
}

// diagonal win function (for difference 4)
function diagon_4_win_X(f,s)
{
   d=s-f;
   if(d==8)
   {  predict=f+4;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
           { draw_X(predict);
           return predict; }
   }
   else if(d==4 && f!=1)
   { predict=f-4;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
           { draw_X(predict);
           return predict; }
   }
   else if(d==4)
   { predict=s+4;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
           { draw_X(predict);
           return predict; }
   }
  return 0;
}

//diagonal win function ( for difference 2 )
function diagon_2_win_X(f,s)
{
   d=s-f;
   if(d==4)
   { predict=f+2;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
      { draw_X(predict);
       return predict; }
   }
   else if(d==2 && f!=3)
   { predict=f-2;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_X(predict);
             return predict; }
   }
   else if(d==2)
   { predict=s+2;
      if(XT[predict-1]!="X" && OT[predict-1]!="Y")
            { draw_X(predict);
             return predict; }
   }
   return 0;
}
/* ===============  Game ( Friends Mode)================ */

function check_XT()    // function for X
{    var i;
     var j;
     var fst;
     var snd;
     for(i=0;i<XLVI;i++)
     {  if( XT[i] =='X')
          {  fst=i+1;
              for(j=i+1;j<XLVI;j++)
              {  if( XT[j] =='X')
                   { snd=j+1;
                      var c=j-i;
                      var k=j+c;
                      switch(c)
                      {
                          case 1 : if( fst%3==0 || snd%3==0 ) 
                                            break;
                                         else if(XT[k]=='X')
                                                  { B_disable();X_win(fst,snd,k+1); return 0;}
                          case 3 : if(XT[k]=='X')
                                            { B_disable();X_win(fst,snd,k+1); return 0;}
                                         else
                                            break;
                          case 4 : if( fst%2==0 || snd%2==0 )
                                            break;
                                         else if(XT[k]=='X')
                                             { B_disable();X_win(fst,snd,k+1);return 0;}
                          case 2 : if( (fst%2==0 || snd%2==0) || ( ( fst==1 || snd==1 ) || fst==5 )  )
                                            break;
                                         else if(XT[k]=='X')
                                                 { B_disable();X_win(fst,snd,k+1); return 0;} 
                      }
                      
                   }
                   
              } //2nd for loop
           }
     } // 1st for loop     
} // function end


function check_OT()   // function for O
{    var i;
     var j;
     var fst;
     var snd;
     for(i=0;i<OLVI;i++)
     {  if( OT[i] =='Y')
          {  fst=i+1;
              for(j=i+1;j<OLVI;j++)
              {  if( OT[j] =='Y')
                   { snd=j+1;
                      var c=j-i;
                      var k=j+c;
                      switch(c)
                      {
                          case 1 : if( fst%3==0 || snd%3==0 ) 
                                            break;
                                         else if(OT[k]=='Y')
                                                  { B_disable();O_win(fst,snd,k+1); return 0;}
                          case 3 : if(OT[k]=='Y')
                                            { B_disable();O_win(fst,snd,k+1); return 0;}
                                         else
                                            break;
                          case 4 : if( fst%2==0 || snd%2==0 )
                                            break;
                                         else if(OT[k]=='Y')
                                             { B_disable();O_win(fst,snd,k+1);return 0;}
                          case 2 : if( (fst%2==0 || snd%2==0) || ( ( fst==1 || snd==1 ) || fst==5 )  )
                                            break;
                                         else if(OT[k]=='Y')
                                                 { B_disable();O_win(fst,snd,k+1); return 0;} 
                      }
                      
                   }
                   
              } //2nd for loop
           }
     } // 1st for loop    
} // function end

/* ================== X win =========== */

function X_win(f,s,j)
{ hide_X(document.getElementById("tx")); // hide the turn
  scX++;  // score variable update
  var b1=document.getElementById(f.toString());
  var b2=document.getElementById(s.toString());
  var b3=document.getElementById(j.toString());
  b1.style.transitionDelay="1s";
  b2.style.transitionDelay="1s";
  b3.style.transitionDelay="1s";
  b1.style.transition="color 0.5s";
  b2.style.transition="color 0.5s";
  b3.style.transition="color 0.5s";
  b1.style.color=" #ff4900 ";
  b2.style.color=" #ff4900 ";
  b3.style.color=" #ff4900 ";
  var z=document.getElementById("scX");   //  score table update 
  z.innerHTML=scX;
  setTimeout(function(){win_board_X()},300);
}

function win_board_X()
{
  var d=document.getElementById("r");   // winner board
  var f=document.getElementById("lt");  // game board
  d.innerHTML="X";
  d.style.visibility="visible";
  d.style.transitionTimingFunction="cubic-bezier(0.80, 0,1,1);";
  f.style.transitionTimingFunction="cubic-bezier(0.80, 0,1,1);";
  d.style.transitionDelay="1s";
  f.style.transitionDelay="3s";
  f.style.transition="opacity 2s";
  d.style.transition="opacity 4s, transform 2s";
  f.style.opacity="0";
  d.style.opacity="1";
  d.style.transform="scale(2.5)";
  document.getElementById("pA").style.visibility="visible";
}
/* ======================== O win ===================*/
function O_win(f,s,j)
{ hide_O(document.getElementById("to")); // hide the turn
  scO++;  // score variable update
  var b1=document.getElementById(f.toString());
  var b2=document.getElementById(s.toString());
  var b3=document.getElementById(j.toString());
  b1.style.transitionDelay="1s";
  b2.style.transitionDelay="1s";
  b3.style.transitionDelay="1s";
  b1.style.transition="color 0.5s";
  b2.style.transition="color 0.5s";
  b3.style.transition="color 0.5s";
  b1.style.color=" #ff4900 ";
  b2.style.color=" #ff4900 ";
  b3.style.color=" #ff4900 ";
  var z=document.getElementById("scO");   //  score table update 
  z.innerHTML=scO;
  setTimeout(function(){win_board_O()},300);
}

function win_board_O()
{
   var d=document.getElementById("r");   // winner board
  var f=document.getElementById("lt");  // game board
  d.innerHTML="O";
  d.style.visibility="visible";
  d.style.transitionTimingFunction="cubic-bezier(0.80, 0,1,1);";
  f.style.transitionTimingFunction="cubic-bezier(0.80, 0,1,1);";
  d.style.transitionDelay="1s";
  f.style.transitionDelay="3s";
  f.style.transition="opacity 2s";
  d.style.transition="opacity 4s, transform 2s";
  f.style.opacity="0";
  d.style.opacity="1";
  d.style.transform="scale(2.5)";
  document.getElementById("pA").style.visibility="visible";
}
/* ======================== game Draw ================ */
function Draw()
{
   var d=document.getElementById("r");   // X winner board
  var f=document.getElementById("lt");  // game board
  d.innerHTML="XO";
  d.style.visibility="visible";
  d.style.transitionDelay="0s";
  f.style.transitionDelay="0s";
  f.style.transition="opacity 0s";
  d.style.transition="opacity 3s, transform 3s";
  f.style.opacity="0";
  d.style.opacity="1";
  d.style.transform="scale(2.5)";
  document.getElementById("pA").style.visibility="visible";
}
/* =========================  board button disable ============*/
function B_disable()
{
   for(var i=1;i<10;i++)
    { var b=document.getElementById(i.toString());
       b.disabled=true; } 
}
/* ====================== board button enable ================*/
function B_enable()
{
     for(var i=1;i<10;i++)
     {  var b=document.getElementById(i.toString());
       b.disabled=false;
       b.innerHTML="";
       b.style.color="white"; } 
}
/* =======================  reset game =============== */

function G_reset()
{
     n=0;  // reseting the value of n
     
     m=0;  // reseting the value of m

    // deleting the array values
     for(var j=8;j>=0;j--)
        XT.pop();
     for(var j=8;j>=0;j--)
         OT.pop();

      //game board reset
      B_enable();     //  to  enable buttons
      var d=document.getElementById("r");   // X winner board
      var f=document.getElementById("lt");  // game board
      d.style.transition="opacity 1s";
      d.style.opacity="0";
      d.style.visibility="hidden";
      f.style.transition="opacity 1s";
      f.style.opacity="1";
       document.getElementById("pA").style.visibility="hidden";
      document.getElementById("swap").style.visibility="visible"; 
      document.getElementById("r").style.visibility="hidden";
      if(s==0)
       show_X(document.getElementById("tx"));
      else
      show_O(document.getElementById("to"));
      gm_enable();
}