var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/SpacecraftShape.ts
var SpacecraftShape;
var init_SpacecraftShape = __esm({
  "src/SpacecraftShape.ts"() {
    "use strict";
    init_src();
    SpacecraftShape = class {
      static getCraftGElement(type) {
        const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const additionalPaths = [];
        const path0 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        switch (type) {
          case "rokket":
            const outline = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const inline = document.createElementNS("http://www.w3.org/2000/svg", "path");
            outline.setAttribute("d", `M 0 -8, 
                                            L  -4 8,
                                            L -2 4,
                                            L 0 8,
                                            L 2 6, 
                                            L 4 8,
                                            z`);
            outline.setAttribute("fill", "none");
            outline.setAttribute("stroke", `${color}`);
            outline.setAttribute("stroke-width", "1px");
            outline.setAttribute("vector-effect", "non-scaling-stroke");
            inline.setAttribute("d", `M -.2 -5,
                                            L .2 -5,
                                            L 2 2,
                                            L -1.5 2,
                                            z`);
            inline.setAttribute("fill", "none");
            inline.setAttribute("stroke", `${color}`);
            inline.setAttribute("stroke-width", ".5px");
            inline.setAttribute("vector-effect", "non-scaling-stroke");
            gElement.appendChild(outline);
            gElement.appendChild(inline);
            return gElement;
          case "rainbowRocket":
            gElement.setAttribute("fill", "grey");
            gElement.setAttribute("stroke-width", ".5");
            gElement.setAttribute("stroke", `${color}`);
            const wingLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
            wingLeft.setAttribute("d", "M-2 -3 q-1.5 1, -2 3 q1 -0.5, 2 -1z");
            const wingRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
            wingRight.setAttribute("d", "M 2 -3 q 1.5 1, 2 3 q-1 -0.5, -2 -1z");
            const summitball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            summitball.setAttribute("cx", "0");
            summitball.setAttribute("cy", "-9");
            summitball.setAttribute("r", ".2");
            const fire = document.createElementNS("http://www.w3.org/2000/svg", "path");
            fire.setAttribute("d", `M -2 2 Q -3 5, -2 8 Q -1 7, -1 6 Q -1 7.5, 0 9 Q 1 7.5, 1 6 Q 1 7, 2 8 Q 3 5, 2 2 Q 0 1.5, -2 2`);
            const topwindow = document.createElementNS("http://www.w3.org/2000/svg", "path");
            topwindow.setAttribute("d", "M -1 -5 q .75 -.75, 1 -1 q .75 .75, 1 1 q -1 -.25, -2 0");
            const middlewindow = document.createElementNS("http://www.w3.org/2000/svg", "path");
            middlewindow.setAttribute("d", "M-1 -3 q -.5 2, 0 4 q .5 .15, 1 0 q -.5 -2, 0 -4 q -.5 -.15, -1 0");
            gElement.appendChild(wingLeft);
            gElement.appendChild(wingRight);
            gElement.appendChild(summitball);
            gElement.appendChild(fire);
            gElement.appendChild(topwindow);
            gElement.appendChild(middlewindow);
            return gElement;
          case "blizzer.png":
            gElement.setAttribute("fill", "none");
            gElement.setAttribute("stroke-width", ".5");
            gElement.setAttribute("stroke", `${color}`);
            path0.setAttribute("d", `M 0,-20, 
                                        L -4, -12 
                                        L -8 -8
                                        L -8 -15`);
            additionalPaths.push(path0);
            path1.setAttribute("d", `M 0,-20, 
                                        L 4, -12 
                                        L 8 -8
                                        L 8 -15`);
            additionalPaths.push(path1);
            const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path2.setAttribute("d", `M -4,-10, 
                                        L -4, 0 
                                        L -8 2
                                        L 8 2
                                        L 4 0
                                        L 4 -10`);
            additionalPaths.push(path2);
            break;
          case "bromber":
            gElement.setAttribute("fill", "none");
            gElement.setAttribute("stroke-width", ".5");
            gElement.setAttribute("stroke", `${color}`);
            const box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            box.setAttribute("x", "-18");
            box.setAttribute("y", "-25");
            box.setAttribute("rx", "10");
            box.setAttribute("ry", "5");
            box.setAttribute("width", "34");
            box.setAttribute("height", "52");
            additionalPaths.push(box);
          case "helgram.png":
            gElement.setAttribute("transform", "translate(-50,220) scale(0.0393700787401575,0.0100000)");
            gElement.setAttribute("fill", `${color}`);
            gElement.setAttribute("stroke", "none");
            path0.setAttribute("d", `M1790 2633 c-11 -26 -23 -58 -27 -72 -3 -14 -12 -34 -20 -43 -13 -15
                    -14 -40 -3 -189 6 -95 15 -179 19 -187 11 -19 1 -62 -15 -69 -7 -2 -10 -12 -7
                    -21 4 -13 3 -14 -5 -3 -8 11 -13 11 -33 -2 -13 -8 -39 -18 -58 -22 -19 -4 -43
                    -16 -54 -26 -20 -18 -21 -18 -37 1 -18 20 -46 28 -35 10 3 -5 -3 -10 -14 -10
                    -12 0 -21 5 -21 10 0 6 -14 10 -31 10 -16 0 -28 -4 -25 -9 3 -5 -2 -12 -11
                    -16 -10 -3 -19 -1 -21 4 -2 6 -20 11 -41 11 -57 0 -69 29 -66 165 2 61 -1 155
                    -5 210 -4 55 -3 113 1 129 5 17 4 36 -2 47 -6 13 -6 25 1 39 12 23 -4 64 -23
                    57 -16 -5 -36 -63 -36 -104 -1 -35 14 -45 22 -15 3 9 5 -1 6 -23 0 -36 -1 -38
                    -14 -21 -13 17 -14 15 -21 -18 -3 -20 -4 -69 0 -109 3 -39 8 -119 11 -177 3
                    -58 8 -117 11 -132 5 -25 4 -26 -53 -30 -37 -3 -68 1 -87 10 -16 8 -59 14
                    -100 14 -58 0 -75 4 -94 22 -19 17 -36 21 -99 21 l-75 0 -3 131 c-1 73 -6 138
                    -11 145 -14 24 -20 164 -10 239 5 41 5 43 -9 26 -8 -11 -15 -28 -15 -38 0 -21
                    -12 -23 -40 -6 -31 20 -33 4 -5 -48 23 -44 24 -52 15 -103 -13 -70 -13 -128 0
                    -136 16 -10 12 -61 -6 -76 -14 -11 -15 -27 -9 -104 4 -49 8 -105 9 -123 2 -34
                    -8 -50 -19 -32 -4 6 -17 4 -36 -6 -45 -23 -177 -152 -206 -201 -26 -45 -106
                    -121 -152 -144 -14 -7 -38 -21 -52 -31 -23 -15 -28 -16 -33 -3 -3 8 -1 15 4
                    15 15 0 46 35 52 58 9 31 -10 38 -21 9 -12 -31 -31 -43 -41 -27 -7 12 -4 126
                    5 182 3 17 -1 28 -11 32 -22 8 -24 8 -24 -9 0 -8 -4 -15 -10 -15 -5 0 -10 17
                    -10 38 0 24 3 32 9 23 5 -8 11 -9 15 -3 3 6 2 13 -3 16 -5 3 -12 22 -15 41 -6
                    28 -12 35 -30 35 -21 0 -24 -6 -34 -82 -18 -124 -13 -216 9 -202 5 3 9 1 9 -5
                    0 -5 -5 -11 -11 -13 -9 -3 -9 -26 0 -88 16 -113 -1 -442 -29 -565 -13 -55 -13
                    -225 0 -225 6 0 10 -11 10 -25 0 -14 4 -25 8 -25 4 0 6 -28 4 -62 -2 -35 3
                    -117 12 -183 8 -66 16 -198 17 -293 1 -152 3 -173 17 -170 20 4 35 71 26 118
                    -9 51 -14 182 -6 194 3 6 5 66 3 132 -2 107 -1 123 15 132 14 8 16 18 11 56
                    -4 25 -3 46 2 46 17 0 305 -280 492 -478 21 -21 35 -29 43 -23 6 4 20 5 31 1
                    18 -7 19 -8 3 -15 -10 -4 -18 -13 -18 -20 0 -27 21 -26 54 2 32 29 36 30 143
                    31 105 1 111 0 116 -20 5 -18 10 -20 39 -12 57 14 209 13 310 -3 86 -14 100
                    -14 135 -1 21 9 66 19 100 23 54 6 64 5 70 -10 3 -10 1 -26 -5 -36 -7 -10 -12
                    -21 -12 -24 0 -13 27 -3 50 18 65 60 142 57 82 -3 -40 -39 -102 -115 -102
                    -124 0 -20 38 0 86 45 30 29 54 49 54 46 0 -3 15 7 32 24 33 29 41 32 115 31
                    29 -1 45 4 51 15 13 23 3 53 -19 53 -38 0 -27 22 56 107 47 48 116 129 153
                    180 37 51 73 95 80 98 7 2 18 -7 24 -23 11 -25 12 -23 18 36 9 77 18 89 57 70
                    34 -16 41 -53 42 -221 1 -74 5 -115 15 -130 8 -12 17 -51 21 -87 4 -36 13 -78
                    20 -95 7 -16 17 -43 24 -59 10 -24 14 -26 27 -15 17 14 16 81 -6 224 -5 39
                    -12 108 -15 154 -3 52 -10 88 -17 93 -10 6 -9 11 5 19 9 5 17 20 17 31 0 17
                    -3 19 -12 10 -19 -19 -28 -14 -28 12 0 23 3 24 41 21 l42 -4 -6 77 c-3 42 -10
                    91 -16 107 -57 183 -97 580 -71 711 7 32 15 86 17 119 3 33 9 65 13 70 10 13
                    35 184 28 191 -4 3 -2 19 2 35 10 33 0 43 -31 34 -13 -5 -17 -10 -11 -18 26
                    -33 18 -167 -10 -167 -7 0 -7 4 0 13 13 15 10 75 -5 101 -9 17 -10 17 -17 1
                    -5 -13 -9 -15 -19 -6 -11 8 -16 3 -25 -26 -6 -20 -10 -39 -8 -41 2 -2 7 6 11
                    17 3 12 10 21 15 21 13 0 18 -36 8 -54 -8 -14 -12 -15 -25 -4 -15 12 -16 7
                    -11 -49 5 -47 2 -65 -8 -74 -8 -7 -14 -31 -14 -60 0 -56 -14 -64 -28 -16 -13
                    45 -31 135 -35 177 -2 19 -4 1 -5 -40 -1 -45 6 -103 17 -145 18 -70 18 -135
                    -1 -135 -6 0 -8 -14 -5 -35 3 -19 2 -37 -2 -39 -13 -9 -90 75 -123 133 -17 31
                    -49 74 -69 96 -43 46 -111 132 -198 254 l-61 84 5 76 c8 117 6 141 -11 178 -9
                    18 -14 36 -11 40 15 15 41 -35 58 -115 l19 -87 -5 68 c-9 104 -15 126 -50 160
                    -18 19 -30 39 -27 50 4 17 22 24 22 8 0 -5 7 -11 15 -15 13 -4 14 3 10 47 -3
                    29 -7 90 -9 137 -6 142 -37 180 -76 93z m62 -153 c1 -14 0 -38 -1 -55 -2 -29
                    -3 -28 -15 12 -7 22 -13 67 -13 100 l0 58 14 -45 c8 -25 15 -56 15 -70z m-43
                    -117 c27 -107 20 -246 -11 -215 -15 15 -24 252 -10 252 6 0 16 -17 21 -37z
                    m11 -288 c0 -14 0 -27 0 -30 0 -3 -3 -6 -6 -7 -12 -5 -27 29 -21 46 10 25 27
                    19 27 -9z m-969 0 c19 -8 27 -14 19 -14 -14 0 -72 28 -59 29 4 0 22 -7 40 -15z
                    m5 -24 c8 -8 47 -17 194 -43 30 -6 81 -11 113 -12 41 -1 61 -6 67 -16 11 -19
                    -6 -161 -24 -210 -19 -48 -31 -128 -18 -115 5 6 15 28 22 50 15 48 36 80 43
                    68 3 -5 7 -38 8 -74 1 -35 6 -70 12 -76 6 -9 5 -13 -4 -13 -12 0 -12 -2 0 -9
                    11 -7 10 -12 -5 -29 -16 -19 -20 -20 -45 -7 -24 13 -27 13 -23 -3 5 -23 -11
                    -41 -76 -82 -46 -29 -133 -102 -227 -191 -11 -11 -38 -52 -59 -92 -35 -69
                    -130 -197 -145 -197 -23 0 -27 37 -24 230 4 246 22 659 31 715 7 41 38 85 60
                    85 6 0 17 7 24 15 14 16 60 20 76 6z m357 -38 c-7 -2 -19 -2 -25 0 -7 3 -2 5
                    12 5 14 0 19 -2 13 -5z m583 -27 l34 -34 0 -183 c0 -144 -3 -186 -14 -198 -8
                    -9 -19 -58 -26 -116 -11 -105 -15 -381 -5 -408 4 -8 7 -46 9 -83 1 -38 6 -77
                    10 -86 6 -13 4 -18 -7 -18 -13 0 -69 67 -137 165 -14 20 -44 56 -67 80 -23 24
                    -67 76 -99 115 -31 39 -62 69 -68 67 -6 -3 -19 2 -29 11 -25 22 -31 10 -7 -16
                    11 -12 20 -24 20 -28 0 -20 -110 107 -114 132 -1 8 -7 19 -12 22 -21 15 -47
                    80 -40 98 8 18 8 18 17 -1 5 -11 18 -33 28 -50 11 -16 30 -49 42 -73 12 -24
                    29 -46 38 -49 9 -2 23 -8 32 -13 9 -5 -10 37 -42 93 l-58 102 -11 130 c-6 72
                    -13 138 -16 149 -4 12 -2 16 5 12 7 -5 9 3 5 23 -5 23 -2 32 14 40 17 9 18 16
                    11 53 -4 24 -4 46 -1 50 15 15 241 11 260 -4 16 -13 97 8 131 34 34 26 59 22
                    97 -16z m-1136 -195 c0 -47 -5 -102 -10 -121 -6 -19 -12 -77 -15 -128 -2 -51
                    -8 -98 -12 -105 -4 -7 -8 -109 -8 -228 0 -186 2 -216 15 -215 9 1 16 -9 18
                    -25 2 -20 -2 -28 -18 -32 -13 -3 -18 -10 -14 -20 3 -10 -4 -22 -19 -32 -35
                    -23 -176 -13 -282 20 -44 14 -97 25 -118 25 -23 0 -44 7 -56 19 -18 18 -19 31
                    -16 148 5 155 13 243 26 303 8 37 7 46 -5 56 -21 15 -20 44 2 70 17 21 100 79
                    182 126 25 15 74 57 110 94 61 63 163 164 185 183 18 15 35 -50 35 -138z
                    m1253 52 c41 -59 119 -158 161 -203 18 -19 45 -58 61 -85 37 -65 70 -101 123
                    -132 l43 -26 -2 -126 c-2 -69 -2 -191 -1 -271 2 -164 -5 -206 -34 -202 -47 7
                    -274 2 -317 -6 -51 -10 -121 -2 -99 12 7 4 24 5 37 2 27 -7 45 12 24 25 -8 5
                    -24 9 -35 9 -43 0 -47 20 -50 233 -2 138 1 206 8 215 9 10 8 16 -3 24 -11 7
                    -11 11 -1 15 6 2 12 9 12 15 0 5 6 15 13 22 7 7 12 28 11 47 -5 126 -6 182 -5
                    322 1 99 5 157 11 157 6 0 25 -21 43 -47z m-1866 15 c-3 -8 -6 -5 -6 6 -1 11
                    2 17 5 13 3 -3 4 -12 1 -19z m12 -96 c1 -23 -3 -32 -11 -29 -11 3 -16 70 -8
                    97 4 13 19 -39 19 -68z m2321 -197 c0 -8 -4 -17 -10 -20 -6 -4 -10 5 -10 20 0
                    15 4 24 10 20 6 -3 10 -12 10 -20z m-1164 -107 c9 -14 7 -554 -2 -581 -3 -10
                    -19 -20 -35 -24 -33 -6 -34 -29 -1 -26 18 2 22 -6 31 -65 6 -37 12 -80 14 -95
                    3 -34 22 -32 22 2 1 40 19 35 59 -16 20 -26 56 -68 79 -93 50 -53 179 -244
                    181 -268 2 -33 -129 -36 -321 -6 -87 13 -127 14 -265 5 -109 -8 -165 -8 -172
                    -1 -10 10 -1 23 78 107 28 31 37 46 29 54 -12 12 -116 -100 -133 -145 -10 -28
                    -11 -29 -72 -22 -72 7 -101 23 -123 68 -8 18 -35 54 -58 79 -66 73 -117 135
                    -156 192 -20 28 -42 58 -49 65 -6 7 -12 20 -12 28 0 8 -6 14 -14 14 -14 0
                    -126 133 -126 151 0 6 8 8 18 5 9 -3 31 -8 47 -12 17 -3 63 -17 104 -31 103
                    -34 205 -35 286 -2 58 24 60 26 57 59 -2 26 4 41 31 69 61 66 107 130 137 188
                    26 54 80 113 208 226 30 28 34 28 51 13 21 -19 31 -12 31 21 0 13 6 23 14 23
                    8 0 16 7 20 15 7 18 32 20 42 3z m78 -108 c24 -44 61 -91 160 -207 11 -12 35
                    -46 55 -75 40 -58 151 -168 170 -168 6 0 31 -18 55 -40 42 -39 61 -77 57 -111
                    -2 -21 45 -34 65 -18 16 13 407 19 420 7 9 -9 -26 -43 -85 -83 -24 -16 -55
                    -45 -70 -64 -41 -55 -102 -110 -115 -105 -7 3 -19 -2 -26 -11 -9 -11 -9 -15
                    -1 -15 7 0 9 -5 5 -11 -4 -8 -9 -7 -15 2 -4 7 -10 11 -13 9 -2 -3 -28 -25 -56
                    -50 -28 -25 -73 -64 -100 -88 -46 -41 -49 -43 -110 -40 -56 2 -64 5 -85 33
                    -22 30 -80 122 -122 192 -21 35 -93 120 -185 216 l-47 50 1 71 c0 39 -1 76 -2
                    81 -7 31 1 475 8 475 5 0 21 -23 36 -50z m1043 -95 c-2 -20 -10 -41 -17 -48
                    -10 -10 -12 -8 -6 6 3 10 6 32 6 48 0 16 5 29 10 29 6 0 9 -15 7 -35z m-752
                    -180 c71 -74 93 -105 75 -105 -11 0 -46 27 -64 49 -6 7 -27 31 -46 51 -37 40
                    -39 43 -82 108 -40 59 -34 65 11 12 21 -25 69 -76 106 -115z m888 -92 c19 -70
                    28 -153 18 -171 -6 -11 -11 -30 -11 -41 0 -12 -7 -21 -15 -21 -8 0 -15 1 -16
                    3 -4 15 -9 223 -5 233 7 19 24 17 29 -3z m-108 -23 c11 -18 8 -126 -4 -148
                    -21 -39 -34 -15 -26 47 5 31 7 68 6 84 -1 27 12 36 24 17z m-2211 -176 c19 -7
                    91 -103 83 -110 -8 -9 -107 86 -107 102 0 16 2 16 24 8z m2366 -29 c14 -17 5
                    -36 -15 -28 -16 6 -21 43 -6 43 5 0 14 -7 21 -15z m-590 -371 c0 -3 -18 -23
                    -41 -45 -22 -21 -38 -43 -35 -48 10 -16 -10 -21 -28 -8 -16 12 -16 14 4 40 12
                    15 28 27 35 27 8 0 19 9 25 20 10 18 40 29 40 14z m-130 -244 c0 -12 -28 -25
                    -36 -17 -9 9 6 27 22 27 8 0 14 -5 14 -10z`);
            additionalPaths.push(path0);
            path1.setAttribute("d", "M510 910 c0 -13 30 -13 50 0 11 7 7 10 -17 10 -18 0 -33 -4 -33 -10z");
            additionalPaths.push(path1);
        }
        const imageUrl = `./${type}`;
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.href.baseVal = imageUrl;
        image.onload = () => {
          let imageWidth = image.getBBox().width;
        };
        image.setAttribute("width", `50`);
        image.setAttribute("height", `50`);
        image.setAttribute("stroke", `${color}`);
        image.setAttribute("transform", `translate (-25,-25)`);
        gElement.appendChild(image);
        if (additionalPaths) {
          additionalPaths.forEach((object) => {
            gElement.appendChild(object);
          });
        }
        return gElement;
      }
      // Funktion zum Laden der SVG-Datei
    };
  }
});

// src/KeyboardController.ts
var KeyboardController;
var init_KeyboardController = __esm({
  "src/KeyboardController.ts"() {
    "use strict";
    init_src();
    KeyboardController = class {
      keysPressed = {};
      constructor(svgElement) {
        gameFrame.addEventListener("keydown", this.handleKeyDown.bind(this));
        gameFrame.addEventListener("keyup", this.handleKeyUp.bind(this));
      }
      handleKeyDown(event) {
        this.keysPressed[event.key] = true;
      }
      handleKeyUp(event) {
        this.keysPressed[event.key] = false;
      }
      // Methode, um den Zustand einer Taste abzufragen
      isKeyPressed(key) {
        return this.keysPressed[key] || false;
      }
      getKeysPressed() {
        return this.keysPressed;
      }
    };
  }
});

// src/Vector2D.ts
var Vector2D;
var init_Vector2D = __esm({
  "src/Vector2D.ts"() {
    "use strict";
    Vector2D = class _Vector2D {
      _x;
      _y;
      // properties length and angle are rather unused - might be deleted
      _length = 0;
      _angle = 0;
      constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        if (x != 0 || y != 0) {
          this._length = Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
          this._angle = Math.atan2(this._y, this._x);
        }
      }
      static fromLengthAndAngle(length, angle) {
        if (angle >= 360 || angle < 0) {
          angle = (angle % 360 + 360) % 360;
        }
        angle = angle / 180 * Math.PI;
        const x = Math.cos(angle) * length;
        const y = Math.sin(angle) * length;
        return new _Vector2D(x, y);
      }
      add(vector) {
        this._x += vector.x;
        this._y += vector.y;
      }
      distanceTo(destination) {
        let distanceVector = new _Vector2D(destination.x - this._x, destination.y - this._y);
        return distanceVector.length;
      }
      inverse() {
        this._x = -this._x;
        this._y = -this._y;
      }
      get length() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
      }
      get angle() {
        const angle = Math.atan2(this._y, this._x) / Math.PI * 180;
        return angle % 360;
      }
      get x() {
        return this._x;
      }
      get y() {
        return this._y;
      }
      set x(x) {
        this._x = x;
      }
      set y(y) {
        this._y = y;
      }
      // Create a Vector2D object from a JSON representation
      static fromJSON(json) {
        return new _Vector2D(json.x, json.y);
      }
      // Convert Vector2D object to JSON representation
      toJSON() {
        return {
          x: this._x,
          y: this._y
        };
      }
    };
  }
});

// src/Joystick.ts
var Joystick;
var init_Joystick = __esm({
  "src/Joystick.ts"() {
    "use strict";
    init_Vector2D();
    Joystick = class {
      _htmlElement;
      _knobElement;
      _fireButton;
      _value = new Vector2D();
      _isTouched = false;
      _fires = false;
      touchEndObservers = [];
      // Array von Funktionen, die beim touchend-Ereignis aufgerufen werden
      constructor() {
        this._htmlElement = document.createElement("div");
        this._htmlElement.setAttribute("style", `width: 200px; 
                                                        height: 200px; 
                                                        background-color: gray; 
                                                        opacity: .5;
                                                        border-radius: 50%; 
                                                        position: absolute;
                                                        bottom: 20px;
                                                        left: 10px;`);
        this._knobElement = document.createElement("div");
        this._knobElement.setAttribute("style", `width: 50px;
                                                height: 50px;
                                                background-color: darkgray;
                                                border-radius: 50%;
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                transform: translate(-50%, -50%);
                                                `);
        this._htmlElement = document.createElement("div");
        this._htmlElement.setAttribute("style", `width: 200px; 
                                                        height: 200px; 
                                                        background-color: gray; 
                                                        opacity: .5;
                                                        border-radius: 50%; 
                                                        position: absolute;
                                                        bottom: 20px;
                                                        left: 10px;`);
        this._fireButton = document.createElement("div");
        this._fireButton.setAttribute("style", `width: 100px; 
                                                        height: 100px; 
                                                        background-color: darkgray; 
                                                        opacity: .5;
                                                        border-radius: 50%; 
                                                        position: absolute;
                                                        bottom: 80px;
                                                        right: 50px;`);
        this._htmlElement.appendChild(this._knobElement);
        this.initEvents();
      }
      // Methode zum Hinzufügen von touchend-Beobachtern
      addObserver(observer) {
        this.touchEndObservers.push(observer);
      }
      get fireButton() {
        return this._fireButton;
      }
      get fires() {
        return this._fires;
      }
      get htmlElement() {
        return this._htmlElement;
      }
      get isTouched() {
        return this._isTouched;
      }
      get knobElement() {
        return this._knobElement;
      }
      get value() {
        return this._value;
      }
      initEvents() {
        this._knobElement.addEventListener("touchstart", this.onTouchStart.bind(this));
        this._knobElement.addEventListener("touchmove", this.onTouchMove.bind(this));
        this._knobElement.addEventListener("touchend", this.onTouchEnd.bind(this));
        this._fireButton.addEventListener("touchstart", this.fire.bind(this));
        this._fireButton.addEventListener("touchend", this.fireEnd.bind(this));
      }
      fire(event) {
        this._fires = true;
        this.fireButton.style.backgroundColor = "darkgreen";
        event.preventDefault();
      }
      fireEnd(event) {
        this._fires = false;
        this.fireButton.style.backgroundColor = "grey";
        event.preventDefault();
      }
      onTouchStart(event) {
        this._isTouched = true;
        event.preventDefault();
      }
      onTouchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const offsetX = touch.clientX - this._htmlElement.getBoundingClientRect().left;
        const offsetY = touch.clientY - this._htmlElement.getBoundingClientRect().top;
        const centerX = this._htmlElement.offsetWidth / 2;
        const centerY = this._htmlElement.offsetHeight / 2;
        const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);
        const relativDistance = distance / centerX;
        const angle = Math.atan2(offsetY - centerY, offsetX - centerX);
        if (distance <= centerX) {
          this._knobElement.style.left = `${offsetX}px`;
          this._knobElement.style.top = `${offsetY}px`;
        } else {
          const x = centerX + centerX * Math.cos(angle);
          const y = centerY + centerY * Math.sin(angle);
          this._knobElement.style.left = `${x}px`;
          this._knobElement.style.top = `${y}px`;
        }
        this._value = Vector2D.fromLengthAndAngle(relativDistance / 10, angle / Math.PI * 180);
      }
      onTouchEnd(event) {
        event.preventDefault();
        this._isTouched = false;
        this._knobElement.style.left = "50%";
        this._knobElement.style.top = "50%";
        this._value = new Vector2D(0, 0);
        this.touchEndObservers.forEach((observer) => observer());
      }
    };
  }
});

// src/GameEnvironment.ts
var viewBoxWidth, GameEnvironment;
var init_GameEnvironment = __esm({
  "src/GameEnvironment.ts"() {
    "use strict";
    init_Joystick();
    init_src();
    viewBoxWidth = 200;
    GameEnvironment = class {
      screenAspectRatio;
      viewBoxToScreenRatio;
      viewBoxWidth;
      viewBoxHeight;
      viewBoxLeft;
      viewBoxTop;
      label = document.createElement("HTMLLabelElement");
      _svgElement;
      _joystick = new Joystick();
      constructor() {
        if (gameFrame.offsetHeight != 0) {
          this.screenAspectRatio = gameFrame.offsetWidth / gameFrame.offsetHeight;
        } else {
          console.log("gameFrame not properly sized");
          this.screenAspectRatio = 0.8;
        }
        this.viewBoxWidth = viewBoxWidth;
        this.viewBoxToScreenRatio = this.viewBoxWidth / window.innerWidth;
        this.viewBoxHeight = this.viewBoxWidth / this.screenAspectRatio;
        this.viewBoxLeft = -this.viewBoxWidth / 2;
        this.viewBoxTop = -this.viewBoxHeight / 2;
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.style.position = "absolute";
        console.log(gameFrame.clientHeight);
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}`);
        this._svgElement.setAttribute("tabindex", "0");
        const viewBoxBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        viewBoxBorder.setAttribute("x", `${this.viewBoxLeft}`);
        viewBoxBorder.setAttribute("y", `${this.viewBoxTop}`);
        viewBoxBorder.setAttribute("width", `${this.viewBoxWidth}`);
        viewBoxBorder.setAttribute("height", `${this.viewBoxHeight}`);
        viewBoxBorder.setAttribute("fill", `none`);
        viewBoxBorder.setAttribute("stroke-width", `2px`);
        viewBoxBorder.setAttribute("stroke", `green`);
        this._svgElement.appendChild(viewBoxBorder);
        gameFrame.appendChild(this._svgElement);
        gameFrame.style.height = `${window.innerHeight}px`;
        gameFrame.appendChild(this._joystick.htmlElement);
        gameFrame.appendChild(this._joystick.fireButton);
        this.joystick.htmlElement.style.display = "none";
        this.label.style.position = "absolute";
        this.label.style.top = "10px";
        this.label.style.left = "10px";
        this.label.style.border = "2px solid darkgreen";
        this.label.style.backgroundColor = "lightgrey";
        this.label.style.opacity = "0.8";
        this.label.innerHTML = `Steuere dein Raumschiff mit dem linken Feld, aktiviere den Strahl durch Druck auf das rechte Feld! <br>Andere online-Spieler erkennst du an ihrem Schild.`;
        gameFrame.appendChild(this.label);
        window.addEventListener(`resize`, this.handleResize.bind(this));
      }
      displayTouchControl() {
        this.joystick.htmlElement.style.display = "block";
      }
      get joystick() {
        return this._joystick;
      }
      get svgElement() {
        return this._svgElement;
      }
      handleResize() {
        this.updateLabel();
        gameFrame.style.width = `${window.innerWidth}px`;
        gameFrame.style.height = `${window.innerHeight}px`;
        this._svgElement.style.width = `${window.innerWidth}px`;
        this._svgElement.style.height = `${window.innerHeight}px`;
        this.viewBoxWidth = window.innerWidth * this.viewBoxToScreenRatio;
        this.viewBoxHeight = this.viewBoxWidth / this.screenAspectRatio;
        this._svgElement.setAttribute("viewBox", `${this.viewBoxLeft}, ${this.viewBoxTop}, ${this.viewBoxWidth}, ${this.viewBoxHeight}`);
      }
      updateLabel() {
        this.label.innerHTML = `gameFrame.clientWidth doesnt change: ${gameFrame.clientWidth}, gameFrame.clientHeight: ${gameFrame.clientHeight}<br>
                                    window.innerWidth is dynamic: ${window.innerWidth}, window.innerHeight: ${window.innerHeight}<br>
                                    this.viewBoxWidth: ${this.viewBoxWidth}, this.viewBoxHeight: ${this.viewBoxHeight}<br>
                                    this._svgElement.getAttribute("viewBox"): ${this._svgElement.getAttribute("viewBox")}`;
      }
      setLabel(text) {
        this.label.innerHTML = text;
      }
      handleSpacecraft(spacecraft, option) {
        switch (option) {
          case "pseudoOrbit":
            spacecraft.pseudoOrbit;
            break;
          case "pseudoTorus":
            if (spacecraft.location.x < this.viewBoxLeft)
              spacecraft.location.x = this.viewBoxLeft + viewBoxWidth;
            if (spacecraft.location.x > this.viewBoxLeft + viewBoxWidth)
              spacecraft.location.x = this.viewBoxLeft;
            if (spacecraft.location.y < this.viewBoxTop)
              spacecraft.location.y = this.viewBoxTop + this.viewBoxHeight;
            if (spacecraft.location.y > this.viewBoxTop + this.viewBoxHeight)
              spacecraft.location.y = this.viewBoxTop;
            break;
        }
      }
    };
  }
});

// src/Spacecraft.ts
var fontSize, Spacecraft;
var init_Spacecraft = __esm({
  "src/Spacecraft.ts"() {
    "use strict";
    init_SpacecraftShape();
    init_Vector2D();
    init_GameEnvironment();
    init_src();
    fontSize = viewBoxWidth / 45;
    Spacecraft = class _Spacecraft {
      _gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
      _type;
      _color;
      _id;
      _touchControlType;
      easing = false;
      _direction = 0;
      _maneuverability = 2;
      _impuls = new Vector2D();
      _location = new Vector2D();
      _npc = false;
      _lastUpdate = Date.now();
      _scale = 1;
      _label;
      _labelBorder;
      constructor() {
        this._type = "rocket";
        this._color = "fl\xFCn";
        this._id = "spacecraft";
        this._touchControlType = "spacecraft";
      }
      accelerate(thrust) {
        let vector = Vector2D.fromLengthAndAngle(thrust, this.direction);
        this._impuls.add(vector);
      }
      applyLabel(svgElement) {
        this._labelBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svgElement.appendChild(this._labelBorder);
        this._labelBorder.setAttribute("x", `${this.scale * 6.7}`);
        this._labelBorder.setAttribute("y", `${-fontSize}`);
        this._labelBorder.setAttribute("stroke-width", "2px");
        this._labelBorder.setAttribute("stroke", "grey");
        this._labelBorder.setAttribute("vector-effect", "non-scaling-stroke");
        this._labelBorder.setAttribute("fill", "lightgrey");
        this._labelBorder.setAttribute("fill-opacity", ".8");
        this._label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        svgElement.appendChild(this._label);
        this._label.setAttribute("font-size", `${fontSize}px`);
        this._label.innerHTML = `<tspan x="${this._scale * 7}">label text not set yet, yet to be written`;
        setTimeout(() => {
          if (this._labelBorder && this._label) {
            this._labelBorder.style.width = (this._label.getBBox().width * 1.1).toString();
            this._labelBorder.style.height = (this._label.getBBox().height * 1.1).toString();
          }
        });
      }
      brake(dampingFactor) {
        const newLength = this._impuls.length * (1 - dampingFactor);
        this._impuls = Vector2D.fromLengthAndAngle(newLength, this._impuls.angle);
        if (this._impuls.length < 0.01) {
          this._impuls = new Vector2D(0, 0);
        }
      }
      async gradualBrake() {
        while (this._impuls.length > 0.01) {
          this.brake(0.1);
          await this.delay(100);
        }
        this._impuls = new Vector2D(0, 0);
      }
      delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      handleKeyboardInput(keysPressed2) {
        if (keysPressed2["ArrowLeft"]) {
          this.rotate(-this._maneuverability);
        }
        if (keysPressed2["ArrowRight"]) {
          this.rotate(this._maneuverability);
        }
        if (keysPressed2["ArrowUp"]) {
          this.accelerate(this._maneuverability / 100);
        }
        if (keysPressed2["ArrowDown"]) {
          this.brake(this._maneuverability / 10);
        }
      }
      handleTouchControl(vector) {
        let deltaAngle = this._direction - vector.angle;
        switch (this._type) {
          case `rokket`:
            this._impuls.add(vector);
            this._direction = vector.angle;
            break;
          case `rainbowRocket`:
            this._impuls.add(vector);
            if (deltaAngle > 0 && deltaAngle < 180 || deltaAngle < -180) {
              this.rotate(-5);
            } else if (deltaAngle < 0 || deltaAngle > 180) {
              this.rotate(5);
            }
            break;
          case `../resources/bromber.svg`:
            this._impuls.add(vector);
            if (deltaAngle < -180)
              deltaAngle += 360;
            if (deltaAngle > 180)
              deltaAngle -= 360;
            if (Math.abs(deltaAngle) > 8) {
              this.rotate(-180 / deltaAngle);
            }
            break;
          case `../resources/blizzer.png`:
            this._impuls.add(vector);
            if (!this.easing) {
              this.easing = true;
              const startDirection = this._direction;
              this.ease(startDirection, vector.angle);
            }
            break;
          case `../resources/eye.svg`:
            const horizontalValue = vector.x;
            const verticalValue = vector.y;
            this.accelerate(-verticalValue);
            this.rotate(horizontalValue * this._maneuverability * 50);
            break;
          default:
            this._impuls.add(vector);
            this._direction = vector.angle;
        }
      }
      async ease(oldDirection, target) {
        const deltaAngle = target - this._direction;
        let easeValue;
        const steps = Math.ceil(Math.abs(deltaAngle));
        for (let i = 1; i <= steps; i++) {
          easeValue = this.easeInOutBack(i / steps);
          this._direction = oldDirection + easeValue * deltaAngle;
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        this.easing = false;
      }
      easeInOutBack(x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return x < 0.5 ? Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
      }
      pseudoOrbit(vector) {
        const distance = this._location.distanceTo(vector);
        if (distance < viewBoxWidth / 2)
          this._scale = Math.cos(distance / (viewBoxWidth / 4) * Math.PI / 4);
        if (distance > viewBoxWidth / 2) {
          this.impuls.inverse();
        }
      }
      rotate(angle) {
        this._direction += angle;
        if (this._direction > 180) {
          this._direction -= 360;
        } else if (this._direction < -180) {
          this._direction += 360;
        }
      }
      get direction() {
        return this._direction;
      }
      get label() {
        return this._label;
      }
      get impuls() {
        return this._impuls;
      }
      get lastUpdate() {
        return this._lastUpdate;
      }
      get location() {
        return this._location;
      }
      get npc() {
        return this._npc;
      }
      set location(location) {
        this._location = location;
      }
      get scale() {
        return this._scale;
      }
      get type() {
        return this._type;
      }
      set type(type) {
        this._type = type;
      }
      get color() {
        return this._color;
      }
      set color(color2) {
        this._color = color2;
      }
      get id() {
        return this._id;
      }
      set id(id) {
        this._id = id;
      }
      get gElement() {
        return this._gElement;
      }
      set gElement(g) {
        this._gElement = g;
      }
      set scale(scale) {
        this._scale = scale;
      }
      set touchControlType(newType) {
        if (newType === "rokket" || newType === "rainbowRocket")
          this._touchControlType = "spacecraft";
        else this._touchControlType = "butterfly";
      }
      setLabelText(text) {
        if (this._label) {
          this._label.setAttribute("font-family", "Arial");
          this._label.setAttribute("stroke-width", ".05");
          this._label.setAttribute("stroke", `${color}`);
          this._label.innerHTML = text;
        }
        if (this._labelBorder && this._label) {
          this._labelBorder.style.width = (this._label.getBBox().width * 1.1).toString();
          this._labelBorder.style.height = (this._label.getBBox().height * 1.1).toString();
        }
      }
      tractorBeam(vector) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("id", `tractorBeam`);
        line.setAttribute("x1", `${this._location.x}`);
        line.setAttribute("y1", `${this._location.y}`);
        line.setAttribute("x2", `${vector.x}`);
        line.setAttribute("y2", `${vector.y}`);
        line.setAttribute("stroke", "darkgreen");
        line.setAttribute("stroke-width", "5px");
        return line;
      }
      update() {
        this._location.add(this._impuls);
        this.gElement.setAttribute("transform", `translate (${this._location.x} ${this._location.y}) scale (${this._scale}) rotate (${this.direction + 90})`);
        if (this._label && this._labelBorder) {
          this._label.setAttribute("transform", `translate(${this._location.x} ${this._location.y})`);
          this._labelBorder.setAttribute("transform", `translate(${this._location.x - 7.5 + this.scale * 7}, ${this._location.y})`);
        }
      }
      updateFromJSON(json) {
        this._direction = json.direction;
        this._impuls = Vector2D.fromJSON(json.impuls);
        this._location = new Vector2D(json.location.x, json.location.y);
        this._lastUpdate = json.lastUpdate;
      }
      // Convert Spacecraft object to JSON representation
      toJSON() {
        this._lastUpdate = Date.now();
        return {
          type: this._type,
          color: this._color,
          id: this._id,
          direction: this._direction,
          impuls: this._impuls.toJSON(),
          location: this._location.toJSON(),
          lastUpdate: this._lastUpdate,
          //apply timestamp each time the vessel is transformed to JSON
          npc: this._npc
        };
      }
      // Create a Spacecraft object from a JSON representation
      static fromJSON(json) {
        const spacecraft = new _Spacecraft();
        spacecraft._type = json.type;
        spacecraft._color = json.color;
        spacecraft._id = json.id;
        spacecraft._npc = json.npc;
        spacecraft._direction = json.direction;
        spacecraft._impuls = new Vector2D(json.impuls.x, json.impuls.y);
        spacecraft._location = new Vector2D(json.location.x, json.location.y);
        spacecraft._gElement = SpacecraftShape.getCraftGElement(spacecraft.type);
        return spacecraft;
      }
      // Update spacecraft properties from another spacecraft object
      updateFrom(other) {
        this._direction = other.direction;
        this._impuls = other._impuls;
        this._location = other._location;
      }
      vanish() {
        const animate = () => {
          if (this._scale > 0.1) {
            this._scale -= this._scale / 100;
            this.update();
            requestAnimationFrame(animate);
          } else {
            this._gElement.parentNode?.removeChild(this._gElement);
            if (this._label) {
              this._label.parentNode?.removeChild(this._label);
              this._labelBorder?.parentNode?.removeChild(this._labelBorder);
            }
          }
        };
        animate();
      }
    };
  }
});

// src/SpaceGame.ts
var SpaceGame, ServerRequestHandler;
var init_SpaceGame = __esm({
  "src/SpaceGame.ts"() {
    "use strict";
    init_Spacecraft();
    init_GameEnvironment();
    init_SpacecraftShape();
    init_src();
    init_src();
    init_Vector2D();
    init_Spacecraft();
    SpaceGame = class {
      spacecraft;
      spacecrafts = [];
      gameEnvironment;
      touchControl = true;
      serverRequestHandler;
      constructor() {
        this.spacecraft = new Spacecraft();
        this.gameEnvironment = new GameEnvironment();
        this.gameEnvironment.displayTouchControl();
        this.gameEnvironment.joystick.addObserver(() => this.handleTouchEndEvent());
        gameFrame.focus();
        this.serverRequestHandler = new ServerRequestHandler();
      }
      init(type, color2, id) {
        this.spacecraft.type = type;
        this.spacecraft.color = color2;
        if (id) this.spacecraft.id = id;
        this.spacecraft.gElement = SpacecraftShape.getCraftGElement(this.spacecraft.type);
        this.spacecraft.touchControlType = this.spacecraft.type;
        this.gameEnvironment.svgElement.appendChild(this.spacecraft.gElement);
        this.spacecraft.applyLabel(this.gameEnvironment.svgElement);
        this.gameLoop();
        setInterval(() => {
          this.syncReality();
        }, 50);
      }
      async handleTouchEndEvent() {
        this.spacecraft.gradualBrake();
      }
      gameLoop() {
        requestAnimationFrame(() => {
          this.gameLoop();
        });
        if (this.touchControl) {
          if (this.gameEnvironment.joystick.isTouched) {
            this.spacecraft.handleTouchControl(this.gameEnvironment.joystick.value);
          }
          let tractorBeam = document.getElementById("tractorBeam");
          if (this.gameEnvironment.joystick.fires && this.spacecrafts[0]) {
            if (!tractorBeam) {
              tractorBeam = this.spacecraft.tractorBeam(this.spacecrafts[0].location);
              this.gameEnvironment.svgElement.appendChild(tractorBeam);
            }
            tractorBeam.style.display = "block";
            tractorBeam.setAttribute("x1", `${this.spacecraft.location.x}`);
            tractorBeam.setAttribute("y1", `${this.spacecraft.location.y}`);
            tractorBeam.setAttribute("x2", `${this.spacecrafts[0].location.x}`);
            tractorBeam.setAttribute("y2", `${this.spacecrafts[0].location.y}`);
          } else if (!this.spacecrafts[0] && tractorBeam) {
            tractorBeam.style.display = "none";
          } else if (!this.gameEnvironment.joystick.fires && tractorBeam) {
            tractorBeam.style.display = "none";
          }
        }
        this.spacecraft.handleKeyboardInput(keyboardController.getKeysPressed());
        this.updateElements();
      }
      updateElements() {
        this.spacecraft.update();
        this.gameEnvironment.handleSpacecraft(this.spacecraft, "pseudoTorus");
        this.spacecraft.setLabelText(`<tspan x="${this.spacecraft.scale * 7}"> 
                                        ${this.spacecraft.id}</tspan>
                                        `);
        if (this.spacecrafts.length > 0) {
          this.spacecrafts.forEach((spacecraft) => {
            if (spacecraft.npc) {
              spacecraft.pseudoOrbit(new Vector2D(0, 0));
            } else {
              this.gameEnvironment.handleSpacecraft(spacecraft, "pseudoTorus");
            }
            spacecraft.update();
            if (spacecraft.label) {
              spacecraft.setLabelText(`<tspan x="${spacecraft.scale * 7}"> 
                                            id: ${spacecraft.id} </tspan>
                                            <tspan x="${spacecraft.scale * 7}" dy="${fontSize}">
                                           lastUpdate: ${spacecraft.lastUpdate}</tspan>
                                           <tspan x="${spacecraft.scale * 7}" dy="${2 * fontSize}">
                                           Date.now(): ${Date.now()}</tspan>`);
            }
          });
        }
      }
      async syncReality() {
        try {
          const receivedData = await this.serverRequestHandler.sendData(this.spacecraft.toJSON());
          if (!Array.isArray(receivedData)) {
            console.error("Received data is not in the expected format (array)");
            return;
          }
          this.spacecrafts = this.spacecrafts.filter((spacecraft) => {
            const index = receivedData.findIndex((data) => data.id === spacecraft.id);
            if (index == -1) {
              spacecraft.vanish();
              return false;
            }
            return true;
          });
          receivedData.forEach((element) => {
            const index = this.spacecrafts.findIndex((spacecraft) => spacecraft.id === element.id);
            if (index !== -1 && !element.npc) {
              this.spacecrafts[index].updateFromJSON(element);
            } else if (index === -1) {
              const spacecraft = Spacecraft.fromJSON(element);
              if (!spacecraft.npc)
                spacecraft.applyLabel(this.gameEnvironment.svgElement);
              this.spacecrafts.push(spacecraft);
              this.gameEnvironment.svgElement.appendChild(spacecraft.gElement);
            }
          });
        } catch (error) {
          console.error("Error syncing spacecraft data:", error);
        }
      }
    };
    ServerRequestHandler = class {
      async sendData(data) {
        try {
          const response = await fetch("https://spacepatrol.zapto.org/sync", {
            //http://spacepatrolzone.dynv6.net  http://192.168.2.222:3000  http://localhost https://spacepatrol.zapto.org/sync
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          if (!response.ok) {
            throw new Error("Failed to send data");
          }
          return await response.json();
        } catch (error) {
          throw error;
        }
      }
    };
  }
});

// src/library.ts
var library_exports = {};
__export(library_exports, {
  initGame: () => initGame
});
function initGame(gameFrame2, type, color2, id) {
  console.log("spaceGame loads");
  const game = new SpaceGame();
  game.init(type, color2, id);
}
var init_library = __esm({
  "src/library.ts"() {
    "use strict";
    init_SpaceGame();
  }
});

// src/index.ts
function loop() {
  if (!loopRunning) return;
  requestAnimationFrame(() => loop());
  if (joystick.isTouched) {
    rotationImpuls = joystick.value.x * 100;
    viewBoxWidth2 += joystick.value.y * 10;
    viewBoxLeft = viewBoxWidth2 / -2;
    viewBoxHeight = viewBoxWidth2 * previewSvgAspectRatio;
    viewBoxTop = viewBoxHeight / -2;
    previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth2}, ${viewBoxHeight}`);
  }
  if (keyboardController.getKeysPressed()[`ArrowLeft`]) {
    rotationImpuls -= 1;
  } else if (keyboardController.getKeysPressed()[`ArrowRight`]) {
    rotationImpuls += 1;
  }
  if (keyboardController.getKeysPressed()[`ArrowUp`]) {
    viewBoxWidth2 += viewBoxWidth2 / 10;
    viewBoxLeft = viewBoxWidth2 / -2;
    viewBoxHeight = viewBoxWidth2 * previewSvgAspectRatio;
    viewBoxTop = viewBoxHeight / -2;
    previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth2}, ${viewBoxHeight}`);
  } else if (keyboardController.getKeysPressed()[`ArrowDown`]) {
    viewBoxWidth2 -= viewBoxWidth2 / 10;
    viewBoxLeft = viewBoxWidth2 / -2;
    viewBoxHeight = viewBoxWidth2 * previewSvgAspectRatio;
    viewBoxTop = viewBoxHeight / -2;
    previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth2}, ${viewBoxHeight}`);
  }
  rotationAngle += rotationImpuls;
  rotationAngle = (rotationAngle % 360 + 360) % 360;
  previewSvg.style.transform = `rotate(${rotationAngle}deg)`;
  if (!keysPressed[`ArrowLeft`] && !keysPressed[`ArrowRight`]) {
    rotationImpuls -= rotationImpuls / 100;
  }
  if (Math.abs(rotationImpuls) < 0.1)
    rotationImpuls = 0;
}
function initAudioContext() {
  audioContext = new window.AudioContext();
}
function loadAudio() {
  fetch(audioSelector.value).then((response) => response.arrayBuffer()).then((buffer) => {
    if (audioContext) {
      return audioContext.decodeAudioData(buffer);
    }
  }).then((decodedBuffer) => {
    if (decodedBuffer) {
      audioBuffer = decodedBuffer;
    }
  }).catch((error) => {
    console.error("Error loading audio file:", error);
  });
}
function playAudio() {
  if (!audioContext)
    initAudioContext();
  loadAudio();
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}
async function startSpaceGame() {
  loopRunning = false;
  console.log(`Commander ${idInputElement.value}, you depart in a ${color} ${typeSelector.value}. Game starts now!`);
  try {
    let lib = await Promise.resolve().then(() => (init_library(), library_exports));
    gameFrame.innerHTML = "";
    if (gameFrame.offsetWidth && gameFrame.offsetHeight) {
      console.log("gameFrame sized!");
      lib.initGame(gameFrame, typeSelector.value, color, idInputElement.value);
    } else {
      console.log("Error getting gameFrame size!");
    }
  } catch (error) {
    console.error("Error loading library:", error);
  }
}
var gameFrame, audioBuffer, audioContext, joystick, typeSelector, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, colorSelector, option13, option14, option15, option16, idInputElement, startButton, audioSelector, option17, option18, option19, option20, audioButton, infoContent, viewBoxTop, viewBoxLeft, viewBoxWidth2, viewBoxHeight, color, loopRunning, keysPressed, rotationImpuls, rotationAngle, previewSvgAspectRatio, previewSvg, aspectRatio, keyboardController;
var init_src = __esm({
  "src/index.ts"() {
    init_SpacecraftShape();
    init_KeyboardController();
    init_Joystick();
    gameFrame = document.getElementById("spacepatrolContainer");
    gameFrame.setAttribute("tabIndex", "0");
    gameFrame.style.position = "fixed";
    gameFrame.style.width = `${window.innerWidth}px`;
    gameFrame.style.height = `${window.innerHeight}px`;
    joystick = new Joystick();
    gameFrame.appendChild(joystick.htmlElement);
    typeSelector = document.createElement("select");
    option1 = document.createElement("option");
    option2 = document.createElement("option");
    option3 = document.createElement("option");
    option4 = document.createElement("option");
    option5 = document.createElement("option");
    option6 = document.createElement("option");
    option7 = document.createElement("option");
    option8 = document.createElement("option");
    option9 = document.createElement("option");
    option10 = document.createElement("option");
    option11 = document.createElement("option");
    option12 = document.createElement("option");
    typeSelector.appendChild(option1);
    typeSelector.appendChild(option2);
    typeSelector.appendChild(option3);
    typeSelector.appendChild(option4);
    typeSelector.appendChild(option5);
    typeSelector.appendChild(option6);
    typeSelector.appendChild(option7);
    typeSelector.appendChild(option8);
    typeSelector.appendChild(option9);
    typeSelector.appendChild(option10);
    typeSelector.appendChild(option11);
    typeSelector.appendChild(option12);
    option1.setAttribute("value", "../resources/blizzer.png");
    option1.innerHTML = "disabled selected";
    option2.setAttribute("value", "rokket");
    option3.setAttribute("value", "rainbowRocket");
    option4.setAttribute("value", "../resources/bromber.svg");
    option5.setAttribute("value", "../resources/blizzer.png");
    option6.setAttribute("value", "../resources/flipps.svg");
    option7.setAttribute("value", "../resources/lopman.png");
    option8.setAttribute("value", "../resources/helgram1.png");
    option9.setAttribute("value", "../resources/carrot.svg");
    option10.setAttribute("value", "../resources/rock.svg");
    option11.setAttribute("value", "../resources/rocket.svg");
    option12.setAttribute("value", "../resources/eye.svg");
    option1.textContent = "Chose your vessel";
    option2.textContent = "rokket";
    option3.textContent = "rainbowRocket";
    option4.textContent = "bromber";
    option5.textContent = "blizzer";
    option6.textContent = "flipps";
    option7.textContent = "lopman";
    option8.textContent = "helgram";
    option9.textContent = "carrot";
    option10.textContent = "rock";
    option11.textContent = "rocket";
    option12.textContent = "eye";
    colorSelector = document.createElement("select");
    option13 = document.createElement("option");
    option14 = document.createElement("option");
    option15 = document.createElement("option");
    option16 = document.createElement("option");
    colorSelector.appendChild(option13);
    colorSelector.appendChild(option14);
    colorSelector.appendChild(option15);
    colorSelector.appendChild(option16);
    option13.setAttribute("value", "brown");
    option14.setAttribute("value", "goldenrod");
    option15.setAttribute("value", "beige");
    option16.setAttribute("value", "lightblue");
    option13.textContent = "brown";
    option14.textContent = "goldenrod";
    option15.textContent = "beige";
    option16.textContent = "fl\xFCn";
    idInputElement = document.createElement("input");
    idInputElement.setAttribute("type", "text");
    idInputElement.setAttribute("placeholder", "enter your id");
    startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.addEventListener("click", startSpaceGame);
    audioSelector = document.createElement("select");
    option17 = document.createElement("option");
    option17.innerHTML = "disabled selected";
    option18 = document.createElement("option");
    option19 = document.createElement("option");
    option20 = document.createElement("option");
    audioSelector.appendChild(option17);
    audioSelector.appendChild(option18);
    audioSelector.appendChild(option19);
    audioSelector.appendChild(option20);
    option17.setAttribute("value", "../resources/letusprogresstothecastleoffunk.mp3");
    option18.setAttribute("value", "../resources/letusprogresstothecastleoffunk.mp3");
    option19.setAttribute("value", "../resources/comfortably_numb.mid");
    option20.setAttribute("value", "../resources/letusprogress.mp3");
    option17.textContent = "Chose music";
    option18.textContent = "Let us progress to the castle of funk";
    option19.textContent = "comfortably_numb";
    option20.textContent = "hear me";
    audioButton = document.createElement("button");
    audioButton.textContent = "Play Audio";
    audioButton.addEventListener("click", () => {
      if (audioSelector.value.endsWith(`.mp3`))
        playAudio();
      else
        console.log("unsupported file format");
    });
    infoContent = document.createElement("div");
    infoContent.textContent = "Left Right rotate, up down zoom";
    gameFrame.appendChild(typeSelector);
    gameFrame.appendChild(colorSelector);
    gameFrame.appendChild(idInputElement);
    gameFrame.appendChild(startButton);
    gameFrame.appendChild(audioSelector);
    gameFrame.appendChild(audioButton);
    gameFrame.appendChild(infoContent);
    viewBoxTop = -50;
    viewBoxLeft = -50;
    viewBoxWidth2 = 100;
    viewBoxHeight = 100;
    color = colorSelector.value;
    loopRunning = true;
    keysPressed = {};
    rotationImpuls = 0;
    rotationAngle = 0;
    previewSvgAspectRatio = viewBoxWidth2 / viewBoxHeight;
    previewSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    previewSvg.style.position = "relative";
    aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio >= 1) {
      previewSvg.style.width = window.innerHeight.toString();
    }
    gameFrame.appendChild(previewSvg);
    previewSvg.setAttribute("id", "previewSvg");
    previewSvg.setAttribute("tabindex", "0");
    previewSvg.setAttribute("viewBox", `${viewBoxLeft}, ${viewBoxTop}, ${viewBoxWidth2}, ${viewBoxHeight}`);
    previewSvg.style.zIndex = "-1";
    previewSvg.style.outline = "none";
    previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value));
    keyboardController = new KeyboardController(gameFrame);
    typeSelector.addEventListener("change", () => {
      while (previewSvg.firstChild)
        previewSvg.removeChild(previewSvg.firstChild);
      previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value));
      previewSvg.focus();
    });
    colorSelector.addEventListener("change", () => {
      color = colorSelector.value;
      while (previewSvg.firstChild)
        previewSvg.removeChild(previewSvg.firstChild);
      previewSvg.focus();
      previewSvg.appendChild(SpacecraftShape.getCraftGElement(typeSelector.value));
    });
    loop();
  }
});
init_src();
export {
  color,
  gameFrame,
  keyboardController
};
//# sourceMappingURL=index.js.map
