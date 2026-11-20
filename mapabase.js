// Estilo de Maputnik "Hidalgo · Base suave para peligro por inundación" dividido en dos capas:
//  - estiloBase: fondo, agua, vialidades, relieve y límites (debajo de los polígonos)
//  - estiloEtiquetas: nombres de calles, ríos, colonias, localidades y estados (encima)
// Para actualizarlo, vuelve a exportar desde Maputnik y reemplaza estos objetos.
var estiloBase = {
 "version": 8,
 "name": "Hidalgo · Base suave para peligro por inundación",
 "metadata": {
  "maputnik:renderer": "mlgljs",
  "descripcion": "Mapa base de tonos suaves con etiquetas de vialidades, cuerpos de agua, colonias, localidades y estados colindantes. Datos: OpenStreetMap vía OpenFreeMap (esquema OpenMapTiles)."
 },
 "center": [
  -98.85,
  20.5
 ],
 "zoom": 8,
 "bearing": 0,
 "pitch": 0,
 "sources": {
  "openmaptiles": {
   "type": "vector",
   "url": "https://tiles.openfreemap.org/planet",
   "attribution": "© OpenStreetMap contributors · OpenFreeMap · OpenMapTiles"
  },
  "relieve": {
   "type": "raster-dem",
   "tiles": [
    "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
   ],
   "encoding": "terrarium",
   "tileSize": 256,
   "maxzoom": 14,
   "attribution": "Relieve: Mapzen Terrain Tiles (AWS Open Data)"
  }
 },
 "glyphs": "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
 "layers": [
  {
   "id": "fondo",
   "type": "background",
   "paint": {
    "background-color": "#F7F6F3"
   }
  },
  {
   "id": "cobertura-bosque",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "landcover",
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "wood"
   ],
   "paint": {
    "fill-color": "#EBF0E6",
    "fill-opacity": 0.8
   }
  },
  {
   "id": "cobertura-pastizal",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "landcover",
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "grass",
     "farmland",
     "scrub"
    ],
    true,
    false
   ],
   "paint": {
    "fill-color": "#F0F2EA",
    "fill-opacity": 0.6
   }
  },
  {
   "id": "cobertura-humedal",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "landcover",
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "wetland"
   ],
   "paint": {
    "fill-color": "#E3ECEF",
    "fill-opacity": 0.8
   }
  },
  {
   "id": "areas-naturales",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "park",
   "filter": [
    "==",
    [
     "geometry-type"
    ],
    "Polygon"
   ],
   "paint": {
    "fill-color": "#E6EEDF",
    "fill-opacity": 0.55,
    "fill-outline-color": "#D3DEC8"
   }
  },
  {
   "id": "uso-urbano",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "landuse",
   "minzoom": 8,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "residential",
     "suburb",
     "neighbourhood",
     "quarter"
    ],
    true,
    false
   ],
   "paint": {
    "fill-color": "#EFEDE8",
    "fill-opacity": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     8,
     0.6,
     13,
     1
    ]
   }
  },
  {
   "id": "uso-industrial-comercial",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "landuse",
   "minzoom": 10,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "industrial",
     "commercial",
     "retail",
     "railway"
    ],
    true,
    false
   ],
   "paint": {
    "fill-color": "#EEEBEE"
   }
  },
  {
   "id": "uso-equipamiento",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "landuse",
   "minzoom": 12,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "hospital",
     "school",
     "university",
     "college",
     "cemetery",
     "stadium",
     "pitch"
    ],
    true,
    false
   ],
   "paint": {
    "fill-color": "#F1EEE6"
   }
  },
  {
   "id": "relieve-sombreado",
   "type": "hillshade",
   "source": "relieve",
   "maxzoom": 15,
   "paint": {
    "hillshade-exaggeration": 0.25,
    "hillshade-shadow-color": "#9A9890",
    "hillshade-highlight-color": "#FFFFFF",
    "hillshade-accent-color": "#B8B5AC",
    "hillshade-illumination-direction": 315
   }
  },
  {
   "id": "agua",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "water",
   "paint": {
    "fill-color": "#DCE7EF",
    "fill-outline-color": "#C8D8E5"
   }
  },
  {
   "id": "rios",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "waterway",
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "river"
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#BFD3E2",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.4
     ],
     [
      "zoom"
     ],
     8,
     0.8,
     12,
     2,
     16,
     5
    ]
   }
  },
  {
   "id": "arroyos-canales",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "waterway",
   "minzoom": 10,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "stream",
     "canal",
     "drain",
     "ditch"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#CCDCE8",
    "line-width": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     10,
     0.5,
     16,
     2
    ]
   }
  },
  {
   "id": "edificios",
   "type": "fill",
   "source": "openmaptiles",
   "source-layer": "building",
   "minzoom": 14,
   "paint": {
    "fill-color": "#E9E6E0",
    "fill-outline-color": "#DEDAD2",
    "fill-opacity": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     14,
     0,
     15,
     1
    ]
   }
  },
  {
   "id": "vias-menores-borde",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "minzoom": 12,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "minor",
     "service"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#E4E0D8",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.5
     ],
     [
      "zoom"
     ],
     12,
     1,
     16,
     9,
     18,
     20
    ]
   }
  },
  {
   "id": "vias-menores",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "minzoom": 12,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "minor",
     "service"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#FFFFFF",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.5
     ],
     [
      "zoom"
     ],
     12,
     0.5,
     16,
     7,
     18,
     17
    ]
   }
  },
  {
   "id": "caminos-terraceria",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "minzoom": 13,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "track",
     "path"
    ],
    true,
    false
   ],
   "paint": {
    "line-color": "#D8D3C8",
    "line-width": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     13,
     0.5,
     17,
     1.5
    ],
    "line-dasharray": [
     3,
     2
    ]
   }
  },
  {
   "id": "vias-principales-borde",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "minzoom": 8,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "primary",
     "secondary",
     "tertiary"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#DDD7CB",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.5
     ],
     [
      "zoom"
     ],
     8,
     0.8,
     12,
     3,
     16,
     14,
     18,
     26
    ]
   }
  },
  {
   "id": "vias-principales",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "minzoom": 8,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "primary",
     "secondary",
     "tertiary"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#FFFFFF",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.5
     ],
     [
      "zoom"
     ],
     8,
     0.4,
     12,
     2,
     16,
     12,
     18,
     23
    ]
   }
  },
  {
   "id": "autopistas-borde",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "motorway",
     "trunk"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#D6CEBF",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.5
     ],
     [
      "zoom"
     ],
     6,
     0.8,
     10,
     2.5,
     14,
     8,
     18,
     30
    ]
   }
  },
  {
   "id": "autopistas",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "motorway",
     "trunk"
    ],
    true,
    false
   ],
   "layout": {
    "line-cap": "round",
    "line-join": "round"
   },
   "paint": {
    "line-color": "#FBF8F2",
    "line-width": [
     "interpolate",
     [
      "exponential",
      1.5
     ],
     [
      "zoom"
     ],
     6,
     0.5,
     10,
     1.6,
     14,
     6,
     18,
     26
    ]
   }
  },
  {
   "id": "ferrocarril",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "transportation",
   "minzoom": 10,
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "rail"
   ],
   "paint": {
    "line-color": "#CFCBD3",
    "line-width": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     10,
     0.6,
     16,
     1.6
    ],
    "line-dasharray": [
     4,
     3
    ]
   }
  },
  {
   "id": "limite-estatal-halo",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "boundary",
   "filter": [
    "all",
    [
     "==",
     [
      "get",
      "admin_level"
     ],
     4
    ],
    [
     "!=",
     [
      "get",
      "maritime"
     ],
     1
    ]
   ],
   "layout": {
    "line-join": "round"
   },
   "paint": {
    "line-color": "#EDE8F2",
    "line-width": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     6,
     3,
     12,
     8
    ],
    "line-opacity": 0.8
   }
  },
  {
   "id": "limite-estatal",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "boundary",
   "filter": [
    "all",
    [
     "==",
     [
      "get",
      "admin_level"
     ],
     4
    ],
    [
     "!=",
     [
      "get",
      "maritime"
     ],
     1
    ]
   ],
   "layout": {
    "line-join": "round"
   },
   "paint": {
    "line-color": "#A99FB8",
    "line-width": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     6,
     0.8,
     12,
     1.8
    ],
    "line-dasharray": [
     5,
     2,
     1,
     2
    ]
   }
  },
  {
   "id": "limite-municipal",
   "type": "line",
   "source": "openmaptiles",
   "source-layer": "boundary",
   "minzoom": 9,
   "filter": [
    "==",
    [
     "get",
     "admin_level"
    ],
    6
   ],
   "paint": {
    "line-color": "#C9C3D1",
    "line-width": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     9,
     0.4,
     14,
     1
    ],
    "line-dasharray": [
     2,
     2
    ]
   }
  }
 ]
};

var estiloEtiquetas = {
 "version": 8,
 "name": "Hidalgo · Base suave para peligro por inundación (etiquetas)",
 "metadata": {
  "maputnik:renderer": "mlgljs",
  "descripcion": "Mapa base de tonos suaves con etiquetas de vialidades, cuerpos de agua, colonias, localidades y estados colindantes. Datos: OpenStreetMap vía OpenFreeMap (esquema OpenMapTiles)."
 },
 "center": [
  -98.85,
  20.5
 ],
 "zoom": 8,
 "bearing": 0,
 "pitch": 0,
 "sources": {
  "openmaptiles": {
   "type": "vector",
   "url": "https://tiles.openfreemap.org/planet",
   "attribution": "© OpenStreetMap contributors · OpenFreeMap · OpenMapTiles"
  }
 },
 "glyphs": "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
 "layers": [
  {
   "id": "etq-rios",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "waterway",
   "minzoom": 10,
   "filter": [
    "all",
    [
     "has",
     "name"
    ],
    [
     "match",
     [
      "get",
      "class"
     ],
     [
      "river",
      "canal",
      "stream"
     ],
     true,
     false
    ]
   ],
   "layout": {
    "symbol-placement": "line",
    "symbol-spacing": 400,
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Italic"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     10,
     10,
     16,
     13
    ],
    "text-letter-spacing": 0.1,
    "text-max-angle": 30
   },
   "paint": {
    "text-color": "#6F8FA8",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.5
   }
  },
  {
   "id": "etq-cuerpos-agua",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "water_name",
   "minzoom": 9,
   "filter": [
    "all",
    [
     "has",
     "name"
    ],
    [
     "==",
     [
      "geometry-type"
     ],
     "Point"
    ]
   ],
   "layout": {
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Italic"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     9,
     10,
     15,
     14
    ],
    "text-max-width": 8,
    "text-letter-spacing": 0.05
   },
   "paint": {
    "text-color": "#6F8FA8",
    "text-halo-color": "#DCE7EF",
    "text-halo-width": 1.2
   }
  },
  {
   "id": "etq-cuerpos-agua-linea",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "water_name",
   "minzoom": 9,
   "filter": [
    "all",
    [
     "has",
     "name"
    ],
    [
     "==",
     [
      "geometry-type"
     ],
     "LineString"
    ]
   ],
   "layout": {
    "symbol-placement": "line",
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Italic"
    ],
    "text-size": 12,
    "text-letter-spacing": 0.1
   },
   "paint": {
    "text-color": "#6F8FA8",
    "text-halo-color": "#DCE7EF",
    "text-halo-width": 1.2
   }
  },
  {
   "id": "etq-areas-naturales",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "park",
   "minzoom": 8,
   "filter": [
    "all",
    [
     "has",
     "name"
    ],
    [
     "==",
     [
      "geometry-type"
     ],
     "Point"
    ]
   ],
   "layout": {
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Italic"
    ],
    "text-size": 11,
    "text-max-width": 9
   },
   "paint": {
    "text-color": "#8BA27A",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.5
   }
  },
  {
   "id": "etq-cerros",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "mountain_peak",
   "minzoom": 11,
   "filter": [
    "has",
    "name"
   ],
   "layout": {
    "text-field": [
     "concat",
     [
      "get",
      "name"
     ],
     "\n",
     [
      "to-string",
      [
       "get",
       "ele"
      ]
     ],
     " m"
    ],
    "text-font": [
     "Noto Sans Italic"
    ],
    "text-size": 10,
    "text-max-width": 8
   },
   "paint": {
    "text-color": "#9C9585",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.2
   }
  },
  {
   "id": "etq-vialidades-menores",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "transportation_name",
   "minzoom": 14,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "minor",
     "service"
    ],
    true,
    false
   ],
   "layout": {
    "symbol-placement": "line",
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Regular"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     14,
     9,
     18,
     12
    ],
    "text-max-angle": 30
   },
   "paint": {
    "text-color": "#8A8D93",
    "text-halo-color": "#FFFFFF",
    "text-halo-width": 1.2
   }
  },
  {
   "id": "etq-vialidades-principales",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "transportation_name",
   "minzoom": 11,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "primary",
     "secondary",
     "tertiary",
     "trunk",
     "motorway"
    ],
    true,
    false
   ],
   "layout": {
    "symbol-placement": "line",
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ],
     [
      "get",
      "ref"
     ]
    ],
    "text-font": [
     "Noto Sans Regular"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     11,
     9.5,
     18,
     13
    ],
    "text-max-angle": 30
   },
   "paint": {
    "text-color": "#757980",
    "text-halo-color": "#FFFFFF",
    "text-halo-width": 1.5
   }
  },
  {
   "id": "etq-carreteras-numero",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "transportation_name",
   "minzoom": 8,
   "maxzoom": 11,
   "filter": [
    "all",
    [
     "has",
     "ref"
    ],
    [
     "match",
     [
      "get",
      "class"
     ],
     [
      "motorway",
      "trunk",
      "primary"
     ],
     true,
     false
    ]
   ],
   "layout": {
    "symbol-placement": "line",
    "symbol-spacing": 500,
    "text-field": [
     "get",
     "ref"
    ],
    "text-font": [
     "Noto Sans Bold"
    ],
    "text-size": 9,
    "text-rotation-alignment": "viewport"
   },
   "paint": {
    "text-color": "#8C8578",
    "text-halo-color": "#FFFFFF",
    "text-halo-width": 2
   }
  },
  {
   "id": "etq-colonias",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "place",
   "minzoom": 12,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "suburb",
     "neighbourhood",
     "quarter"
    ],
    true,
    false
   ],
   "layout": {
    "text-field": [
     "upcase",
     [
      "coalesce",
      [
       "get",
       "name:es"
      ],
      [
       "get",
       "name"
      ]
     ]
    ],
    "text-font": [
     "Noto Sans Regular"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     12,
     9,
     16,
     12
    ],
    "text-letter-spacing": 0.12,
    "text-max-width": 8
   },
   "paint": {
    "text-color": "#9A9CA3",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.5
   }
  },
  {
   "id": "etq-localidades-rurales",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "place",
   "minzoom": 10,
   "filter": [
    "match",
    [
     "get",
     "class"
    ],
    [
     "village",
     "hamlet",
     "isolated_dwelling"
    ],
    true,
    false
   ],
   "layout": {
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Regular"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     10,
     9.5,
     15,
     12
    ],
    "text-max-width": 8
   },
   "paint": {
    "text-color": "#6E7480",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.5
   }
  },
  {
   "id": "etq-pueblos",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "place",
   "minzoom": 8,
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "town"
   ],
   "layout": {
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Regular"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     8,
     10.5,
     14,
     14
    ],
    "text-max-width": 8
   },
   "paint": {
    "text-color": "#585E69",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.6
   }
  },
  {
   "id": "etq-ciudades",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "place",
   "minzoom": 6,
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "city"
   ],
   "layout": {
    "text-field": [
     "coalesce",
     [
      "get",
      "name:es"
     ],
     [
      "get",
      "name"
     ]
    ],
    "text-font": [
     "Noto Sans Bold"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     6,
     11,
     10,
     14,
     14,
     18
    ],
    "text-max-width": 8
   },
   "paint": {
    "text-color": "#474D58",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 2
   }
  },
  {
   "id": "etq-estados",
   "type": "symbol",
   "source": "openmaptiles",
   "source-layer": "place",
   "minzoom": 5,
   "maxzoom": 11,
   "filter": [
    "==",
    [
     "get",
     "class"
    ],
    "state"
   ],
   "layout": {
    "text-field": [
     "upcase",
     [
      "coalesce",
      [
       "get",
       "name:es"
      ],
      [
       "get",
       "name"
      ]
     ]
    ],
    "text-font": [
     "Noto Sans Bold"
    ],
    "text-size": [
     "interpolate",
     [
      "linear"
     ],
     [
      "zoom"
     ],
     5,
     10,
     9,
     15
    ],
    "text-letter-spacing": 0.3,
    "text-max-width": 10
   },
   "paint": {
    "text-color": "#A69DB3",
    "text-halo-color": "#F7F6F3",
    "text-halo-width": 1.5
   }
  }
 ]
};
