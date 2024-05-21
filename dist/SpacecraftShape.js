import { color } from "./index";
export class SpacecraftShape {
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
                outline.setAttribute('vector-effect', 'non-scaling-stroke');
                inline.setAttribute("d", `M -.2 -5,
                                            L .2 -5,
                                            L 2 2,
                                            L -1.5 2,
                                            z`);
                inline.setAttribute("fill", "none");
                inline.setAttribute("stroke", `${color}`);
                inline.setAttribute("stroke-width", ".5px");
                inline.setAttribute('vector-effect', 'non-scaling-stroke');
                gElement.appendChild(outline);
                gElement.appendChild(inline);
                return (gElement);
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
                return (gElement);
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
        return (gElement);
    }
}
// Funktion zum Laden der SVG-Datei
function loadSVGFile(filename, callback) {
    fetch(filename)
        .then(response => response.text())
        .then(data => {
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(data, "image/svg+xml");
        const svgElement = svgDocument.querySelector("svg");
        if (svgElement instanceof SVGElement) {
            callback(svgElement);
        }
        else {
            console.error("SVG-Element nicht gefunden.");
        }
    })
        .catch(error => console.error("Fehler beim Laden der SVG-Datei:", error));
}
