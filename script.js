/* GOOGEER UAE landing page: basic page-view measurement only. No personal data is collected. */
(function(){
  const PIXEL_ID = "233915bf-25f6-4119-9362-701fe3212185";
  if (!PIXEL_ID) return;
  try {
    (function(e,t,n){if(e.snaptr)return;const a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];const r=t.createElement("script");r.async=true;r.src=n;const s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(r,s)})(window,document,"https://sc-static.net/scevent.min.js");
    window.snaptr("init", PIXEL_ID);
    window.snaptr("track", "PAGE_VIEW");
  } catch (_) {}
})();
