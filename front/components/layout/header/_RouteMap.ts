
type RouteMapType = {
  [index: string]: string;
  소개: string;
  게스트모집: string;
  체육관대여: string;
  서비스: string;
};

const RouteMap: RouteMapType = {
  소개: '/intro',
  게스트모집: '/guest',
  체육관대여: '/gym',
  서비스: '/service',
};

export default RouteMap