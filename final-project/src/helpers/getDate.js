function getDate(release_date){
    var a = new Date(release_date);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var year = a.getFullYear();
 
    // var locTime = a.toLocaleTimeString("en-US");
    var time = month + ' ' + year
    return (
        <>
        <p>
            {time}
        </p>
        </>
    );
}

export default getDate;