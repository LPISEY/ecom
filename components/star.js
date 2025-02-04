let stars = "";
function star(s) {
  switch (s) {
    case 0:
      stars =
        '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      break;
    case 1:
      stars =
        '<i class="fa fa-star starRated"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      break;
    case 2:
      stars =
        '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      break;
    case 3:
      stars =
        '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      break;
    case 4:
      stars =
        '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star"></i>';
      break;
    case 5:
      stars =
        '<i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i><i class="fa fa-star starRated"></i>';
      break;
    default:
      break;
  }
}
