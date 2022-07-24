<section
class="full-width-section wr-section-full-width   " ><div
class="block-wrapper   "><div
data-anim-wrap class="section-wrapper  "><div
data-anim-wrap class="row-layout row-off   "><div
class="wpb_column vc_column_container vc_col-sm-12"><div
class=vc_column-inner><div
class=wpb_wrapper><div
class="sec-img-slides "><div
class=js-section-slider data-slider-col="base-2 lg-2 md-1 sm-1" data-gap=40 data-loop data-center data-pagination>
<div
class=swiper-wrapper>
<div
class="swiper-slide slider-slide">
 <% product.forEach(element => { %>
    <div 
class="ratio ratio-3:2 bg-image swiper-lazy" data-background="<%- element.image %>">
</div>
<% }) %>

</div>

<div
class="swiper-slide slider-slide"><div
class="ratio ratio-3:2 bg-image swiper-lazy" data-background="../../wp-content/uploads/2021/05/b2.jpeg"></div></div>

<div
class="swiper-slide slider-slide"><div
class="ratio ratio-3:2 bg-image swiper-lazy" data-background="../../wp-content/uploads/2021/05/b3.jpeg"></div></div>

<div
class="swiper-slide slider-slide"><div
class="ratio ratio-3:2 bg-image swiper-lazy" data-background="../../wp-content/uploads/2021/05/b4.jpeg"></div></div>
<div
class="swiper-slide slider-slide"><div
class="ratio ratio-3:2 bg-image swiper-lazy" data-background="../../wp-content/uploads/2021/05/b5.jpeg"></div></div></div><div
class="pagination -dark pb-4 mt-48 js-pagination"></div></div></div></div></div></div></div></div></div>

</section>
















<section
               class="full-width-section    " >
			   <form action="search" method="get">
               <div
                  class="block-wrapper layout-pt-sm layout-pb-lg ">
                  <div
                     data-anim-wrap class="section-wrapper container ">
                     <div
                        data-anim-wrap class="row-layout  row  ">
                        <div
                           class="wpb_column vc_column_container vc_col-sm-12">
                           <div
                              class=vc_column-inner>
                              <div
                                 class=wpb_wrapper>
                                 <div
                                    class="sec-blog row x-gap-48 y-gap-40 ">
									<% for( let i = 0; i < product.length; i++ ) { %>
                                    <div
                                       class="col-lg-4 col-md-6">
                                       <div
                                          data-anim-wrap class="blogCard -type-1 -hover">
                                          <a
                                             class=blogCard__img data-barba href=mobile-ui-design-7-basic-typography-rules-3/index.html >
                                             <div
                                                data-anim-child="img-right -cover-dark-1 delay-1" class=portfolioCard__img__inner>
                                                <div
                                                   class="ratio ratio-4:3 bg-image js-lazy" data-bg="<%- product[i].image %>"></div>
                                             </div>
                                          </a>
            
                                       </div>
                                    </div>
                                   
									<% } %>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
			</form>
            </section>




             
<section
               class="full-width-section    " >
			   <form action="search" method="get">
               <div
                  class="block-wrapper layout-pt-sm layout-pb-lg ">
                  <div
                     data-anim-wrap class="section-wrapper container ">
                     <div
                        data-anim-wrap class="row-layout  row  ">
                        <div
                           class="wpb_column vc_column_container vc_col-sm-12">
                           <div
                              class=vc_column-inner>
                              <div
                                 class=wpb_wrapper>
                                 <div
                                    class="sec-blog row x-gap-48 y-gap-40 ">
									<% for( let i = 0; i < product.length; i++ ) { %>
                                    <div
                                       class="col-lg-4 col-md-6">
                                       <div
                                          data-anim-wrap class="blogCard -type-1 -hover">
                                          <a
                                             class=blogCard__img data-barba href=mobile-ui-design-7-basic-typography-rules-3/index.html >
                                             <div
                                                data-anim-child="img-right -cover-dark-1 delay-1" class=portfolioCard__img__inner>
                                                <div
                                                   class="ratio ratio-4:3 bg-image js-lazy" data-bg="<%- product[i].image %>"></div>
                                             </div>
                                          </a>
            
                                       </div>
                                    </div>
                                   
									<% } %>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
			</form>
            </section>








            
            <% for( let i = 0; i < product.length; i++ ) { %>
               <%- product[i].image %>
               <% } %>
