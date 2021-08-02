const Notification = (props) => {

   return(
      <div className={`fixed bottom-0 flex justify-center w-full h-10 items-center ${ props.red ? 'bg-red-600' : 'bg-green-500' }`}>
         {props.message}
      </div>
   )
};

export default Notification;