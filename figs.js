/* ══════════════════════════════════════════════════════════════
   용접기호 마스터 — 그림 모음 (그림05 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기)과 lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', pages:[쪽번호…], draw:function(){ … } }
       pages — 배우기 몇 쪽(1부터)에 나오는지. 그 쪽 본문 바로 아래 「그림」 칸에 붙는다.

   근거: 기계제도(서울교과서 2015개정) Ⅴ-1 용접 이음 제도하기(353~362쪽, KS B 0052)
         · 홈의 형상 — 홈 각도가 좁으면 용입 불량, 루트 면이 얇으면 용락 (354쪽)
         · 기호 구성 — 화살표 · 기준선 · 동일선 · 일주/현장 용접 · 꼬리 (355~356쪽)
         · 필릿 — z = 단면에 그릴 수 있는 최대 이등변삼각형의 변(목 길이), a = 그 높이(목 두께), z = a√2 (360~361쪽)
         · 단속 필릿 n×l(e) — l 용접 길이, n 개수, (e) 인접한 용접부 간격(피치). 교과서 그림에서 (e) 는
           한 용접부 끝에서 다음 용접부 시작까지로 잡혀 있다 (359쪽 표 Ⅴ-3)
   z6 · 3×50(100) 은 이 도구의 배우기·문항에 쓰인 예시 값이다.
   정답 유출: 슬라이드 빈칸·퀴즈의 답이 되는 글자는 ans:true — 슬라이드는 labels:false 로 불러 ? 로 가린다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout;
  var PL = { fill: C.grayL, w: 2 }, BD = { fill: C.orange, c: C.orange, w: 1.2 };

  function tri(x, y, h, k, o) {      /* 필릿 기호 — 세로 변이 왼쪽. k=-1 위로, +1 아래로 */
    o = o || {};
    return F.poly([[x, y], [x, y + k * h], [x + h * 0.95, y]], { close: 1, c: o.c || C.ink, w: o.w || 2, fill: o.fill || 'none' });
  }
  function tee(x, y, o) {            /* T 이음 단면 — (x,y) 는 세로판 아래 가운데 */
    o = o || {};
    var s = F.poly([[x - 70, y], [x + 70, y], [x + 70, y + 12], [x - 70, y + 12]], Object.assign({ close: 1 }, PL)) +
      box(x - 7, y - 60, 14, 60, { fill: C.grayL, r: 0, w: 2 });
    if (o.right) s += F.poly([[x + 7, y], [x + 25, y], [x + 7, y - 18]], Object.assign({ close: 1 }, BD));
    if (o.left) s += F.poly([[x - 7, y], [x - 25, y], [x - 7, y - 18]], Object.assign({ close: 1 }, BD));
    return s;
  }

  return {

  /* ─────────── ① 이음과 홈 ─────────── */
  'groove-terms': { pages: [1],
    cap: 'V 홈의 각 부분 — 홈 각도가 너무 좁으면 용입 불량, 루트 면이 너무 얇으면 용락이 생기기 쉽다',
    draw: function () {
      var cx = 240, T = 84, B = 178, R = 150, g = 8, dx = (R - T) * Math.tan(Math.PI / 6);
      var s = '';
      s += F.poly([[24, T], [cx - g - dx, T], [cx - g, R], [cx - g, B], [24, B]], Object.assign({ close: 1 }, PL));
      s += F.poly([[436, T], [cx + g + dx, T], [cx + g, R], [cx + g, B], [436, B]], Object.assign({ close: 1 }, PL));
      /* 홈 각도 — 두 빗면을 늘인 선 사이 */
      var ay = R + g / Math.tan(Math.PI / 6), r = 118;
      var p1 = [cx - r * Math.sin(Math.PI / 6), ay - r * Math.cos(Math.PI / 6)], p2 = [cx + r * Math.sin(Math.PI / 6), ay - r * Math.cos(Math.PI / 6)];
      s += line(cx - g - dx, T, p1[0], p1[1], { c: C.blue, w: 1 }) + line(cx + g + dx, T, p2[0], p2[1], { c: C.blue, w: 1 });
      s += F.path('M' + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' A' + r + ',' + r + ' 0 0 1 ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1), { c: C.blue, w: 1.6 });
      s += t(cx, 32, '홈 각도', { a: 'm', b: 1, c: C.blue, ans: 1 });
      s += t(cx + 72, 50, '좁으면 → 용입 불량', { size: 13, c: C.sub, ans: 1 });
      /* 루트 간격 */
      s += line(cx - g, B + 3, cx - g, B + 22, { w: 1 }) + line(cx + g, B + 3, cx + g, B + 22, { w: 1 });
      s += arrow(cx - 40, B + 16, cx - g, B + 16, { w: 1.2, head: 8, c: C.orange }) + arrow(cx + 40, B + 16, cx + g, B + 16, { w: 1.2, head: 8, c: C.orange });
      s += t(cx, B + 40, '루트 간격', { a: 'm', b: 1, c: C.orange, ans: 1 });
      /* 루트 면 */
      s += line(cx - g - 3, R, cx - g - 3, B, { c: C.green, w: 4 });
      s += callout(cx - g - 5, (R + B) / 2, 110, 214, '루트 면', { c: C.green, tc: C.green, b: 1, size: 16, a: 'e', ans: 1 });
      s += t(104, 236, '얇으면 → 용락', { a: 'e', size: 13, c: C.sub, ans: 1 });
      /* 판 두께 */
      s += F.dim(436, T, 436, B, 't', { off: 16, side: -1 });
      return F.svg(480, 250, s);
    } },

  /* ─────────── ② 설명선 ─────────── */
  'callout-parts': { pages: [2],
    cap: '용접기호는 그림 한 덩어리 — 화살표 · 기준선(실선) · 동일선(파선) · 기호 · 일주 · 현장 · 꼬리',
    draw: function () {
      var bx = 170, by = 104, ex = 380, s = '';
      s += tee(90, 196, { right: 1 });
      s += line(bx, by, 101, 186, { w: 2 }) + F.poly([[99, 189], [101, 174], [111, 181]], { close: 1, fill: C.ink, w: 1 });
      s += line(bx, by, ex, by, { w: 2.4 }) + line(bx, by + 16, ex, by + 16, { w: 2, dash: '7 5' });
      s += tri(266, by, 22, -1, { c: C.orange, w: 2.2 });
      s += '<circle cx="' + bx + '" cy="' + by + '" r="8" fill="' + C.paper + '" stroke="' + C.ink + '" stroke-width="2"/>';
      s += line(bx, by - 8, bx, by - 42, { w: 2 }) + F.poly([[bx, by - 42], [bx + 22, by - 35], [bx, by - 28]], { close: 1, fill: C.ink, w: 1 });
      s += line(ex, by, ex + 22, by - 14, { w: 2 }) + line(ex, by, ex + 22, by + 14, { w: 2 });
      /* 이름표 */
      s += callout(128, 148, 122, 110, '① 화살표', { a: 'e', size: 15, b: 1 });
      s += callout(340, by, 340, 66, '② 기준선 (실선)', { a: 'm', size: 15, b: 1 });
      s += callout(340, by + 16, 340, 156, '③ 동일선 (파선)', { a: 'm', size: 15, b: 1 });
      s += callout(bx - 7, by + 5, 212, 196, '④ 일주 용접 ○', { a: 's', size: 15, b: 1 });
      s += callout(bx + 18, by - 36, 208, 44, '⑤ 현장 용접 (깃발)', { a: 's', size: 15, b: 1 });
      s += t(ex + 30, by, '⑥ 꼬리', { size: 15, b: 1, ans: 1 });
      s += callout(276, by - 8, 292, 140, '용접 기호', { a: 's', size: 13, c: C.orange, tc: C.orange });
      return F.svg(480, 222, s);
    } },

  /* ─────────── ③ 실선이냐 파선이냐 ─────────── */
  'side-3': { pages: [3],
    cap: '기호가 실선 위면 화살표 쪽, 파선 위면 반대쪽, 둘 다면 양쪽 — 화살표는 T 이음의 오른쪽 구석을 가리킨다',
    draw: function () {
      var s = '', cols = [['화살표 쪽', 'arrow', '기호가 실선 위'], ['반대쪽', 'other', '기호가 파선 위'], ['양쪽 모두', 'both', '실선 · 파선 둘 다']];
      cols.forEach(function (c, i) {
        var cx = 80 + i * 160, by = 74, j = cx - 20;
        if (i) s += line(cx - 80, 14, cx - 80, 250, { c: C.edge, w: 1.2 });
        s += t(cx, 24, c[0], { a: 'm', b: 1, c: C.orange, ans: 1 });
        s += line(cx - 12, by, cx + 62, by, { w: 2.2 }) + line(cx - 12, by + 14, cx + 62, by + 14, { w: 1.8, dash: '6 4' });
        if (c[1] !== 'other') s += tri(cx + 20, by, 18, -1, { c: C.orange, w: 2.2 });
        if (c[1] !== 'arrow') s += tri(cx + 20, by + 14, 18, 1, { c: C.orange, w: 2.2 });
        s += tee(j, 200, { right: c[1] !== 'other', left: c[1] !== 'arrow' });
        s += line(cx - 12, by, j + 10, 190, { w: 1.8 }) + F.poly([[j + 8, 194], [j + 5, 180], [j + 16, 183]], { close: 1, fill: C.ink, w: 1 });
        s += t(cx, 236, c[2], { a: 'm', size: 13, c: C.sub });
      });
      return F.svg(480, 252, s);
    } },

  /* ─────────── ④ 기본 기호 ─────────── */
  'sym-idea': { pages: [4],
    cap: '기본 기호는 용접부 단면을 본뜬 그림 — V 홈은 V, 필릿은 삼각형, 점 용접은 동그라미',
    draw: function () {
      var s = '', Y = 184;
      /* V 형 맞대기 */
      var a = 80;
      s += F.poly([[a - 70, 56], [a - 14, 56], [a - 4, 96], [a - 70, 96]], Object.assign({ close: 1 }, PL));
      s += F.poly([[a + 70, 56], [a + 14, 56], [a + 4, 96], [a + 70, 96]], Object.assign({ close: 1 }, PL));
      s += F.poly([[a - 14, 56], [a + 14, 56], [a + 4, 96], [a - 4, 96]], Object.assign({ close: 1 }, BD));
      s += line(a - 44, Y, a + 44, Y, { w: 2.2 }) + line(a, Y, a - 13, Y - 26, { w: 2.4 }) + line(a, Y, a + 13, Y - 26, { w: 2.4 });
      /* 필릿 */
      var b = 240;
      s += tee(b, 96, { right: 1 });
      s += line(b - 44, Y, b + 44, Y, { w: 2.2 }) + tri(b - 10, Y, 24, -1, { w: 2.4 });
      /* 점 용접 — 겹친 두 판 사이의 점 */
      var c = 400;
      s += box(c - 70, 62, 100, 14, { fill: C.grayL, r: 0, w: 2 }) + box(c - 30, 76, 100, 14, { fill: C.grayL, r: 0, w: 2 });
      s += '<ellipse cx="' + c + '" cy="76" rx="13" ry="9" fill="' + C.orange + '"/>';
      s += line(c - 44, Y, c + 44, Y, { w: 2.2 }) + F.circle(c, Y, 12, { fill: 'none', w: 2.4 });
      [a, b, c].forEach(function (x) { s += arrow(x, 116, x, 146, { w: 1.8, head: 10, c: C.orange }); });
      s += t(a, 212, 'V형 맞대기', { a: 'm', b: 1, size: 15 }) + t(b, 212, '필릿', { a: 'm', b: 1, size: 15 }) + t(c, 212, '점 용접', { a: 'm', b: 1, size: 15 });
      s += t(240, 24, '용접부 단면', { a: 'm', size: 14, c: C.sub, ans: 1 }) + t(160, 131, '본뜬다', { a: 'm', size: 13, b: 1, c: C.orange, ans: 1 });
      return F.svg(480, 230, s);
    } },

  /* ─────────── ⑤ 치수 ─────────── */
  'fillet-za': { pages: [5],
    cap: '필릿의 크기 — z(목 길이·각장)는 단면에 넣은 최대 이등변삼각형의 변, a(목 두께)는 그 높이. z = a × √2',
    draw: function () {
      var X = 150, Y = 186, Z = 96, s = '';
      s += box(34, Y, 250, 20, { fill: C.grayL, r: 0, w: 2 }) + box(X - 22, 24, 22, Y - 24, { fill: C.grayL, r: 0, w: 2 });
      s += F.poly([[X, Y], [X + Z, Y], [X, Y - Z]], { close: 1, fill: C.orangeL, c: C.orange, w: 2 });
      s += arrow(X, Y, X + Z / 2, Y - Z / 2, { both: 1, w: 1.8, head: 10, c: C.green });
      s += t(X + 18, Y - 32, 'a', { b: 1, size: 19, c: C.green, a: 'm', ans: 1 });
      s += F.dim(X, Y - Z, X, Y, 'z', { off: 36, c: C.blue, ans: 1 });
      s += F.dim(X, Y, X + Z, Y, 'z', { off: 36, side: -1, c: C.blue, ans: 1 });
      s += t(304, 58, 'z  목 길이(각장)', { b: 1, c: C.blue, ans: 1 }) + t(304, 80, '이등변삼각형의 변', { size: 13, c: C.sub, ans: 1 });
      s += t(304, 120, 'a  목 두께', { b: 1, c: C.green, ans: 1 }) + t(304, 142, '그 삼각형의 높이', { size: 13, c: C.sub, ans: 1 });
      s += t(304, 184, 'z = a × √2', { b: 1, size: 17 });
      s += t(304, 208, '우리나라는 z 로 적는다', { size: 13, c: C.sub });
      return F.svg(480, 250, s);
    } },

  intermittent: { pages: [5],
    cap: 'z6 3×50(100) — 각장 6mm 필릿을 길이 50mm 로 3군데, 용접부 사이 간격 100mm (길이 비율은 맞춤)',
    draw: function () {
      var x0 = 40, L = 55, E = 110, s = '';
      /* 위에서 본 T 이음 — 아래판 위에 세로판(띠), 그 옆으로 띄엄띄엄 용접부 */
      s += box(24, 76, 432, 70, { fill: C.grayL, r: 0, w: 2 });
      s += box(24, 98, 432, 12, { fill: C.grayM, r: 0, w: 1.6 });
      for (var i = 0; i < 3; i++) {
        var bx = x0 + i * (L + E);
        s += box(bx, 110, L, 12, { fill: C.orange, c: C.orange, r: 2, w: 1 });
        s += F.num(bx + L / 2, 136, String(i + 1), { c: C.ink, r: 10, size: 13 });
        if (i < 2) s += line(bx, 108, bx, 52, { c: C.sub, w: 1 }) + line(bx + L, 108, bx + L, 52, { c: C.sub, w: 1 });
      }
      s += F.dim(x0, 58, x0 + L, 58, 'l', { c: C.blue, ans: 1 }) + F.dim(x0 + L, 58, x0 + L + E, 58, '(e)', { c: C.green, ans: 1 }) +
        F.dim(x0 + L + E, 58, x0 + 2 * L + E, 58, 'l', { c: C.blue, ans: 1 });
      s += t(452, 168, '용접부 개수 n = 3', { a: 'e', b: 1, size: 15, ans: 1 });
      /* 기호 */
      var by = 206, sx = 196;
      s += line(110, by, 420, by, { w: 2.2 }) + line(110, by + 14, 420, by + 14, { w: 1.8, dash: '6 4' });
      s += line(110, by, 90, 128, { w: 1.6 }) + F.poly([[88, 124], [83, 138], [95, 136]], { close: 1, fill: C.ink, w: 1 });
      s += tri(sx, by, 22, -1, { w: 2.2 });
      s += t(sx - 8, by - 12, 'z6', { a: 'e', b: 1, size: 18 });
      var parts = [['3', C.ink, 12], ['×', C.sub, 12], ['50', C.blue, 22], ['(100)', C.green, 50]], px = sx + 30;
      parts.forEach(function (p) { s += t(px, by - 12, p[0], { b: 1, size: 18, c: p[1] }); px += p[2] + 2; });
      s += t(240, 248, 'n × l (e) — 개수 × 용접 길이 (간격)', { a: 'm', size: 14, ans: 1 });
      return F.svg(480, 262, s);
    } }
  };
})();
