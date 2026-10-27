/* GOOGEER UAE — premium checkout UI; live submission stays disabled until UAE order endpoint is configured. */
const CONFIG = {
  PRODUCT_NAME: "Googeer Himalayan Shilajit UAE",
  SKU: "GOOGEER-SHILAJIT-UAE-100G",
  PRODUCT_WEIGHT: "100 غرام",
  COUNTRY: "AE",
  CURRENCY: "AED",
  OFFERS: {
    1: { label: "عبوة واحدة · 100 غرام", price: 180 },
    2: { label: "عبوتان · 200 غرام", price: 219 },
    3: { label: "3 عبوات · 300 غرام", price: 249 }
  },
  ORDER_ENDPOINT: "",
  SNAP_PIXEL_ID: "233915bf-25f6-4119-9362-701fe3212185"
};
function trackSnap(eventName, data) {
  try { if (typeof window.snaptr !== "function") return false; window.snaptr("track", eventName, data || {}); return true; } catch (_) { return false; }
}
(function initPixel() {
  if (!CONFIG.SNAP_PIXEL_ID) return;
  try {
    (function(e,t,n){if(e.snaptr)return;const a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];const r=t.createElement("script");r.async=true;r.src=n;const s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(r,s)})(window,document,"https://sc-static.net/scevent.min.js");
    window.snaptr("init", CONFIG.SNAP_PIXEL_ID);
    trackSnap("PAGE_VIEW", {item_category:"dietary_supplement",item_ids:[CONFIG.SKU]});
  } catch (_) {}
})();
const form=document.getElementById("order-form");
const total=document.getElementById("summary-total");
const offerSummary=document.getElementById("summary-offer");
const status=document.getElementById("form-status");
const submitButton=form?.querySelector('button[type="submit"]');
const phoneInput=form?.elements.phone;
const phoneError=document.getElementById("phone-error");
let checkoutTracked=false;
function currentOffer(){const code=Number(new FormData(form).get("offer")||1);return CONFIG.OFFERS[code]?{code,...CONFIG.OFFERS[code]}:{code:1,...CONFIG.OFFERS[1]};}
function updateSummary(){const offer=currentOffer();if(offerSummary)offerSummary.textContent=offer.code===1?"عبوة واحدة · 100 غرام · تكفيك شهرين":offer.label;if(total)total.textContent=offer.price+" د.إ";}
function trackCheckout(){if(checkoutTracked)return;const offer=currentOffer();trackSnap("START_CHECKOUT",{price:offer.price,currency:CONFIG.CURRENCY,item_ids:[CONFIG.SKU],item_category:"dietary_supplement",number_items:offer.code});checkoutTracked=true;}
form?.addEventListener("change",()=>{updateSummary();trackCheckout();});
form?.addEventListener("focusin",trackCheckout);
phoneInput?.addEventListener("input",()=>{phoneInput.removeAttribute("aria-invalid");if(phoneError)phoneError.textContent="";if(status){status.textContent="";status.className="form-status";}});
updateSummary();
if(submitButton){submitButton.disabled=false;submitButton.textContent="تأكيد الطلب — الدفع عند الاستلام ←";}
form?.addEventListener("submit",event=>{
 event.preventDefault();
 if(!form||!status||!submitButton)return;
 status.className="form-status error";
 status.textContent="نموذج الطلب غير مفعّل بعد: يجب ربط سجل طلبات الإمارات قبل إرسال بياناتك. لم يتم إرسال أي بيانات.";
 if(phoneError)phoneError.textContent="";
 const phone=String(form.elements.phone.value||"").trim().replace(/[\s()\-]/g,"");
 if(!/^((\+971|971|0)?5[0-9]{8})$/.test(phone)){
   if(phoneError)phoneError.textContent="أدخل رقم جوال إماراتي صحيحًا.";
   form.elements.phone.setAttribute("aria-invalid","true");
 }
});
function scrollToCheckoutStart(){const target=document.getElementById("checkout");if(!target)return;const top=Math.max(0,window.pageYOffset+target.getBoundingClientRect().top-8);window.scrollTo({top,left:0,behavior:"auto"});}
document.addEventListener("click",event=>{const link=event.target.closest('a[href="#checkout"]');if(!link)return;const target=document.getElementById("checkout");if(!target)return;event.preventDefault();if(window.location.hash!=="#checkout")window.history.replaceState(null,"","#checkout");scrollToCheckoutStart();requestAnimationFrame(()=>requestAnimationFrame(scrollToCheckoutStart));});
const checkoutSection=document.getElementById("checkout"),mobileCta=document.querySelector(".mobile-cta");
if(mobileCta&&checkoutSection){const update=()=>{const rect=checkoutSection.getBoundingClientRect(),viewport=window.visualViewport?.height||window.innerHeight;mobileCta.classList.toggle("is-hidden",rect.top<=viewport*.92&&rect.bottom>=80);};window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();}
