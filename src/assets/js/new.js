function toggle_all(){
    $(".navbar-custom, .main, .sidebar").toggleClass("active");
}
$(window).on("load, resize", function(){
    if($(window).width() <= 1300){
        $(".navbar-custom, .main, .sidebar").addClass("active");
    }else{
        $(".navbar-custom, .main, .sidebar").removeClass("active");
    }
})