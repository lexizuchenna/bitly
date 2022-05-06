console.log('I am working')

const header =  document.getElementById('head')
const headerOff  = header.offsetTop

window.onscroll = () =>{
   if(window.pageYOffset > headerOff){
       header.classList.add('sticky')
   } else{
       header.classList.remove('sticky')
   } 
}