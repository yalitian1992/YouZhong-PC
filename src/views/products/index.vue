<template>
	<div>
		<headTop></headTop>
		<normalHead @searchs="search"></normalHead>
		<div style="width: 100%;height: 100%;background: #fff;margin-top: -23px;padding-top: 25px;padding-bottom: 1px">
			<div id="crumbs" class="content" style="margin-top: 55px; background: #fff;border: none;">
				<router-link :to="{path:'/index'}" class="product_ico house_tag" style="font-size: 12px;color: #777;width: 28px;line-height: 16px;background:none;" >{{ $t('message.brands.first') }}</router-link>
				 <div class="ico next_ico" style="color: #777;font-size: 12px;background: none;"> > </div>
				    <p class="text" @click="clean">{{ $t('message.products.all') }}<em class="ico"></em></p>
				    <div class="ico next_ico" style="color: #777;font-size: 12px;background: none;"> > </div>

				<p class="right list">{{ $t('message.products.proudctTotal') }}<span style="color: #222222">{{this.products_count}}</span>{{ $t('message.products.piece') }}</p>
			</div>
			<div class="contents" v-if="content">
				<div class="tip">
					<span class="product_icon"></span>
					<p class="title">{{ $t('message.products.sorry') }}</p>
				</div>
			</div>
			<div v-if="filter">
				<div class="content" id="filter" >
					<div class="filter_choose" v-if="Selected_box">
						<div class="title"><span>{{ $t('message.products.yixuan') }}</span></div>
						<ul class="ul">
							<li v-for="(item, index) in this.Selected" style="overflow: hidden;">
								<p style="line-height: 24px;">
									{{item.name}}：{{item.id}}
								</p>
								<a @click="removes(index,item.name,item.fewLevels)"><em class="product_ico"></em></a>
							</li>
						</ul>
						<a class="right clearall" @click="clean"><span class="product_ico clear"></span>{{ $t('message.products.clenr') }}</a>
					</div>
					<!-- ================循环拼接==已选筛选中，各个筛选项删除时，所需要的跳转的链接=END==========================-->
					<div class=" kind normal brand_tag " id="filter_content" v-if="products_box">
						<div class="kind nor mal">
							<div class="title"><span>{{ $t('message.products.brand') }}：</span></div>
							<div class="ul" :class="{'allHeight':all}">
								<div class="zimupaixu" v-if="all">
									<a :class="{'all':isAll}" @click="noAll" style="width: 40px;">{{ $t('message.trades.all') }}</a>
									<a v-for="n in letter_list1" :class="n == isShow ? 'all' : ''" @click="isAlls(n)">{{n}}</a>
								</div>
								<div class="ul_cont2 products " :class="{maxHeight:addselects,maxproducts:addselects}">
									<a v-for="(item, index) in this.products_id"><span @click="products(item.value,item.name,addselects1)"><span>{{item.name}}</span>({{item.count}})</span>
									</a>
								</div>
								<div class="moreitems" v-if="addselects1">
									<dl>
										<dt>{{ $t('message.products.xuanze') }}：</dt>
										<div class="items_cont"  v-for="n in Multiselectname">
											<dd class=" fwhere-brand_id-37 ">{{n}} <span class="rm_items"><em class="ico" @click="Close(n)"></em></span></dd>
										</div>
										<div class="btn clearthis" @click="empty" v-if="empty_box">清空</div>

									</dl>
									<div class="btns">
										<div class="btn confirm" @click="yesBtn">{{ $t('message.products.yesBtn') }}</div>
										<div class="btn cancel" @click="noBtn">{{ $t('message.products.noBtn') }}</div>
									</div>
								</div>
							</div>
							<div class="options nomore" v-if="selectsText">
								<p class="left many morechoice " @click="selects">
									<span class="product_ico "></span> {{ $t('message.products.Multiselect') }}
								</p>
								<p class="left moreclick" style="padding: 19px 20px 19px 12px;" v-if="moreShow">
									<span class="text" @click="allShow">{{allText}}</span>
									<span class="product_ico uparrow"></span>
								</p>
							</div>
						</div>
					</div>
					<div class=" kind normal" id="filter_content" v-if="classified_box">
						<div class="<%= i>1? 'hide hidetage' : '' %> kind normal <%= filtrate[i].key=='brand_id' ? 'brand_tag' : ''  %> <%= filtrate[i].key=='price' ? 'price_tag' : ''  %>">
							<div class="title"><span>{{ $t('message.products.proudclass') }}：</span></div>
							<div class="ul">
								<div class="ul_cont1" v-if="categoryList">
									<div class="ul_cont2">
										<a v-for="(item, index) in this.category"><span @click="classified(item.value,item.name,1)"><span>{{item.name}}</span><span>({{item.count}})</span></span>
										</a>
									</div>
								</div>
								<div class="ul_cont1" v-if="categoryList2">
									<div class="ul_cont2">
										<a v-for="(item, index) in this.category2"><span @click="classified(item.value,item.name,2)"><span>{{item.name}}</span><span>({{item.count}})</span></span>
										</a>
									</div>
								</div>
								<div class="ul_cont1" v-if="categoryList3">
									<div class="ul_cont2">
										<a v-for="(item, index) in this.category3"><span @click="classified(item.value,item.name,3)"><span>{{item.name}}</span><span>({{item.count}})</span></span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="kind normal  price_tag" id="filter_content" v-if="priace_box">
						<div class="<%= i>1? 'hide hidetage' : '' %> kind normal <%= filtrate[i].key=='brand_id' ? 'brand_tag' : ''  %> <%= filtrate[i].key=='price' ? 'price_tag' : ''  %>">
							<div class="title"><span>{{ $t('message.products.price') }}：</span></div>
							<div class="ul">
								<div class="ul_cont2">
									<a v-for="(item, index) in this.price" @click="prices(item.value[0],item.value[1])"><span>{{item.value[0]}}</span>-<span>{{item.value[1]}}</span>({{item.count}})</a>
								</div>
							</div>
						</div>
					</div>
					<!--<div class="filter_content" id="filter_content" >
    <div class="<%= i>1? 'hide hidetage' : '' %> kind normal <%= filtrate[i].key=='brand_id' ? 'brand_tag' : ''  %> <%= filtrate[i].key=='price' ? 'price_tag' : ''  %>">
      <div class="title"><span>尺码：</span></div>
      <div class="ul">
        <div class="zimupaixu <%= filtrate[i].key!='brand_id' ? 'hide hidetage' : ''%>" >
          <a class="all">全部</a>
        </div>
        <div class="ul_cont1">
           <a href="#">名字(1)</a>
        </div>
      </div>
    </div>
  </div>-->
					<div class="kind normal" id="filter_content" v-if="target_box">
						<div class="<%= i>1? 'hide hidetage' : '' %> kind normal <%= filtrate[i].key=='brand_id' ? 'brand_tag' : ''  %> <%= filtrate[i].key=='price' ? 'price_tag' : ''  %>">
							<div class="title"><span>{{ $t('message.products.gender') }}：</span></div>
							<div class="ul">
								<div class="ul_cont2">
									<a v-for="(item, index) in this.target" v-if="item.value!=''"><span @click="targets(item.value)"><span>{{item.value}}</span><span>({{item.count}})</span></span>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="morefilter " :class="{uparrow:price_show}" id="removeHide" @click="bottomShow"><span class="product_ico " ></span></div>
				</div>
				<div class="content" id="sort_bar">
					<div class="sort_content">
						<a class="btn" :class="index == 0 ? 'active' : ''" @click="popularity({},{},{},null,{},{},0)"><span>{{ $t('message.products.common') }}</span></a>
						<a class="btn" :class="index == 1 ? 'active' : ''" @click="popularity({},'desc',{},{},{},{},1)"><span>{{ $t('message.products.Popularity') }}</span><span class="ico"></span></a>
						<a class="btn" :class="index == 2 ? 'active' : ''" @click="popularity({},{},'asc',{},{},{},2)"><span>{{ $t('message.products.discount') }}</span><span class="ico"></span></a>
						<a class="btn price_desc " :class="index == 3 ? 'active' : ''"  @click="popularity({},{},{},pricedesc,{},{},3)"><span>{{ $t('message.products.price') }}</span><span class="product_ico" :class="{'asc':pricedesc}"></span></a>
						<a class="btn" :class="index == 4 ? 'active' : ''" @click="popularity({},{},{},{},'desc',{},4)"><span>{{ $t('message.products.shelvesTime') }}</span><span class="ico"></span></a>
						<a class="show_sold " :class="index == 5 ? 'active' : ''" style="margin-top: 5px;" @click="popularity({},{},{},{},{},'0',5,outStyle)"><span><em class="ico"></em></span>{{ $t('message.products.soldOut') }}</a>
						<!---->
						<!--<span style="float: right;margin-top: -32px;"><v-pagination :total="total" :current-page='current' :display="display" @pagechange="pagechange"></v-pagination></span>-->
						<!--<div class="page_num right" style="margin-right: 0">
						<%= page %>/
						<%= page_sum %>
						<span class="left_ico noclick"><em class="ico"></em></span>
						<a class="left_ico" href="/products?<%= querystring.stringify(_.merge({},_.omit(link,'page'),{'page' : parseInt(page)-1})) %>"><em class="ico"></em></a>
						<span class="right_ico noclick"><em class="ico"></em></span>
						<a class="right_ico" href="/products?<%= querystring.stringify(_.merge({},_.omit(link,'page'),{'page' : parseInt(page)+1})) %>"><em class="ico"></em></a>
					</div>-->
					</div>
				</div>
				<div class="content" id="products">
					<div target="_blank" class="prod" style="height: 424px;" v-for="(item, index) in datas">
						<div style="margin-top: -18px;">
							<router-link :to="{name:'show',params:{id:item.id}}" target="_blank" >
								<!--<div class="product_ico title_tag soldout"></div>-->
								<div class="title_tag_value" v-if="SoldOut">{{ $t('message.products.shouwan') }}</div>

								<div class="product_ico title_tag" style="background: none"></div>
								<div class="title_tag_value" v-if="item.label!=''&&item.label">
									<div>{{item.label}}</div>
								</div>
								<div class="img_wrapper">
									<div style="width: 270px;height: 270px;overflow: hidden;" class="warp-img">
										<img :src="imgBaseUrl()+item.major_pic+'.m270.jpg'" :onerror="defaultImg(0)">
									</div>
								</div>

								<div class="pro_name">{{item.product_name}}</div>
								<div class="money">
									<span class="original">{{currency}}{{item.discount}}</span>
									<span class="right">{{currency}}{{item.price}}</span>
								</div>
							</router-link>
						</div>
					</div>
				</div>
				<div class="container %>" style="width: 1200px; margin: 0 auto;display: block;height: 30px; margin-bottom: 60px;margin-top: 5px;">
					<div class="border">
					</div>
					<div>
						<span style="float: right;margin-top: -32px;"><v-pagination :total="total" :current-page='current' :display="display" @pagechange="pagechange"></v-pagination></span>
						<a  class="backtop" style="border: none;cursor:pointer;" @click="goTop" >{{ $t('message.brands.goTop') }}</a>
						<div class="clearfloat"></div>
					</div>
				</div>
			</div>
		</div>
		<footErs></footErs>
	</div>
</template>

<script>
	import headTop from '../../components/assembly/headTop.vue'
	import normalHead from '../../components/assembly/normal_head.vue'
	import footErs from '../../components/assembly/foot.vue'
	import pagination from '../../components/assembly/paging'
	import {imgBaseUrl,currency} from '../../../config/config'
	import i18n from '../../assets/js/il8n.js'
	export default {
		i18n,
		data() {
			return {
				total: 150, // 记录总条数
				display: 40, // 每页显示条数
				current: 1, // 当前的页数
				imgBaseUrl,      //图片域名
				currency,
				datas: {},
				keyword: "",
				navListmenu: {},
				content: false,
				filter: true,
				products_count: "",
				products_box: true, //品牌列表
				target_box: true, //性别列表
				priace_box: true, //价格列表
				price_show:false,
				classified_box: true, //分类列表
				products_id: [],
				products_id2:[],
				brand:{},
				category: [], //分类
				category2: {}, //分类
				category3: {}, //分类
				categoryList:false,
				categoryList2:false,
				categoryList3:false,
				all: false, //全部
				moreShow: false, //更多显示
				multiSelect: false, //多选显示
				selectsText: true,
				addselects: false,
				addselects1: false,
				allText: "更多",
				Multiselectid:[],//多选列表
				Multiselectname:[],
				empty_box:false,
				pricedesc:true,//价格降序
				index: 0,
				current:1,
				target: {},
				price: {},
				Selected: [],
				isAll: true,
				isShow: '',
				Selected_box: false,

				SoldOut:false,
				outStyle:false,
				msg: "",
				letter_list1: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
				where: { "where": { "brand_id": [], "unsold_count": {"gt": {}}, "price": { "gt": {}, "lt": {} } }, "name": "", "page": 1, "per_page": 40, "order": {}, "keyword": {} }
			} //
		},
		components: {
			headTop,
			normalHead,
			footErs,
			'v-pagination': pagination
		},
		methods: {
			selects: function() { //多选按钮
				this.addselects = true
				this.moreShow = false
				this.selectsText = false
				this.addselects1 = true
			},
			yesBtn: function() {
				if(this.Multiselectname.length>0){
					this.addselects1 = false
					this.moreShow = true
					this.selectsText = true
					this.addselects = false
					var str="";
					this.where.where.brand_id=this.Multiselectid
					for(var i=0;i<this.Multiselectname.length;i++){
						 str=str+this.Multiselectname[i]+','
					}
					this.Selected.push({ "name": '品牌', "id":str.substr(0, str.length - 1) , "val": 'brand_id' })
					this.pagechange()
					this.empty()
				}

			},
			noBtn: function() {
				this.moreShow = true
				this.selectsText = true
				this.addselects = false
				this.addselects1 = false
				this.empty()
			},
			Close:function(val){

				var index = this.Multiselectname.indexOf(val);
				if(index>-1){
					this.Multiselectname.splice(index, 1);
					this.Multiselectid.splice(index, 1);
				}
				if(this.Multiselectname.length==0){
					this.empty()
				}
			},
			empty:function(){//清空
				this.Multiselectid=[]
				this.Multiselectname=[]
				this.empty_box=false
			},
			SelectedBox: function() {
				this.Selected_box = true
				this.storages()
			},
			allShow: function() {

				this.all = !this.all
				this.moreShow = true
				this.addselects = !this.addselects
				if(this.all == true) {
					this.allText = "收起"
				} else {
					this.allText = "更多"
				}
			},
			bottomShow:function(){
				this.price_show=!this.price_show
				this.pagechange()
			},
			isAlls: function(n) {
				this.isShow = n;
				this.isAll = false;
				this.products_id=this.products_id2
				var arr=[]
				for(var i=0;i<this.products_id.length;i++){
					if(this.products_id[i].initial==n){
						arr.push(this.products_id[i])
					}
				}
				this.products_id=arr
			},
			noAll: function() {
				this.isShow = false;
				this.isAll = true;
				this.products_id=this.products_id2
			},
			goTop:function(){
				document.body.scrollTop = 0;
			},
			removes: function(index, val,fewLevels) {
				this.where.keyword={}
				this.Selected.splice(index, 1)
				switch(val) {
					case "品牌":
						this.where.where.brand_id = {}
						this.SelectedBox()
						break;
					case "分类":

						if(fewLevels==1){this.where.where.category1_id = {}}
						if(fewLevels==2){this.where.where.category2_id = {}}
						if(fewLevels==3){this.where.where.category3_id = {}}
						this.SelectedBox()
						break;
					case "性别":
						this.where.where.target = {}
						this.SelectedBox()
						break;
					case "价格":
						this.where.where.price.gteq = {}
						this.where.where.price.lteq = {}
						this.SelectedBox()
						break;
				}
				this.pagechange()
				if(this.Selected.length == 0) {
					this.Selected_box = false
				}
			},
			popularity: function(compre, popula, discount, prices, shelves, soldout, index,outStyle) { //人气
				this.where.order = compre //综合
				this.where.order.readings_count = popula //人气
				this.where.order.percent = discount //折扣
				if(typeof(prices)=='object'){
					this.where.order.price ={}

				}else{
					if(this.pricedesc==false){
						this.where.order.price = "asc"  //价格
					}else{
						this.where.order.price ="desc"

					}
				}
				this.pricedesc=!this.pricedesc
				this.where.order.arrived_at = shelves //上架时间
				this.index = index

				if(typeof(outStyle)=='undefined'){
					this.where.where.unsold_count.gteq={}
				}else{
					if(outStyle==false){
						this.where.where.unsold_count.gt={}
						this.where.where.unsold_count.gteq = soldout//显示售完
						this.outStyle=!this.outStyle
					}else{
						this.where.where.unsold_count.gteq = {}
						this.outStyle=!this.outStyle
						this.index = 0
					}
				}

				this.pagechange()
			},
			clean: function() { //清除条件
				this.where={ "where": { "brand_id": [], "unsold_count": {"gt": 0}, "price": { "gt": {}, "lt": {} } }, "name": "", "page": 1, "per_page": "40", "order": {}, "keyword": {} }
				this.Selected = []
				this.pagechange()
				this.Selected_box = false
				sessionStorage.removeItem('alHttpData')
				this.empty()
			},
			products: function(brand_id,brand_name,addselects1) { //品牌筛选

				if(addselects1==false){
					this.where.where.brand_id = brand_id
					this.pagechange()
					this.Selected.push({ "name": '品牌', "id": brand_name, "val": 'brand_id' })
					this.SelectedBox()
				}else{
					if(this.Multiselectid.length>0){
						if(this.Multiselectid.indexOf(brand_id,0)==-1){
							this.Multiselectid.push(brand_id)
								this.Multiselectname.push(brand_name)
								this.empty_box=true
						}
					}else{
						this.Multiselectid.push(brand_id)
						this.Multiselectname.push(brand_name)
						this.empty_box=true
					}

				}

			},
			classified: function(classified_id,classified_name,fewLevels) { //分类筛选
				if(this.categoryList==true){
					this.where.where.category1_id = classified_id
				}else if(this.categoryList2==true){
					this.where.where.category2_id = classified_id
				}else if(this.categoryList3==true){
					this.where.where.category3_id = classified_id
				}
				this.Selected.push({ "name": '分类', "id": classified_name ,"fewLevels":fewLevels})
				this.pagechange()
				this.SelectedBox()

			},
			targets: function(target_id) { //性别筛选
				this.where.where.target = target_id
				this.Selected.push({ "name": '性别', "id": target_id })
				this.pagechange()
				this.SelectedBox()
			},
			prices: function(price1, price2) { //价格筛选

				this.where.where.price.gteq = price1
				this.where.where.price.lteq = price2
				this.Selected.push({ "name": '价格', "id": price1 + '~' + price2 })
				this.pagechange()
				this.SelectedBox()

			},
			storages: function() { //本地存储
				var alHttpData = {
					where: this.where,
					Selected: this.Selected
				}
				sessionStorage.setItem('alHttpData', JSON.stringify(alHttpData));
			},

			pagechange: function(currentPage) {
				this.current=currentPage
				this.where.page = currentPage

				this.$http.get("/api/auction/products", { params: this.where }).then(function(res) {
					this.datas = res.data.data.products
					this.products_count = res.data.data.products_count

					this.products_id2=res.data.data.products_facet.brand_id

					this.products_id = res.data.data.products_facet.brand_id
					this.target = res.data.data.products_facet.target
					this.price = res.data.data.products_facet.price
					this.total = res.data.data.products_count
					//console.log(res.data.data.products_facet.category1_id.length)
					this.category = res.data.data.products_facet.category1_id
					this.category2 =res.data.data.products_facet.category2_id
					this.category3 = res.data.data.products_facet.category3_id
					this.brand=res.data.data.brands
					if(this.category!=undefined&&this.category.length>0){
						this.categoryList=true
						this.categoryList2=false
						this.categoryList3=false
					}else if(this.category2!=undefined&&this.category2.length>0){
						this.categoryList2=true
						this.categoryList=false
						this.categoryList3=false
					}else if(this.category3!=undefined&&this.category3.length>0){
						this.categoryList3=true
						this.categoryList2=false
						this.categoryList=false
					}

					if(res.data.data.products.length == 0){
						this.content = true
						this.filter = false
					} else {
						this.content = false
						this.filter = true
					}
					if(this.Selected.length > 0) {
						this.Selected_box = true
					} else {
						this.Selected_box = false
					}
					if(this.products_id == undefined) {
						this.products_box = false
					} else {
						this.products_box = true
					}
					if(this.category == undefined&&this.category2 == undefined&&this.category3 == undefined) {
						this.classified_box = false
					} else {
						this.classified_box = true
					}
					if(this.target == undefined || this.price_show==false) {
						this.target_box = false
					} else {
						this.target_box = true
					}
					if(this.price == undefined || this.price_show==false) {
						this.priace_box = false
					} else {
						this.priace_box = true
					}
					if(this.products_id!=undefined && this.products_id.length > 8) {
						this.moreShow = true
					} else {
						this.moreShow = false
					}
					if(this.products_id!=undefined && this.products_id.length > 2) {
						this.multiSelect = true
					} else {
						this.multiSelect = false
					}
				})
			},
			search:function(keyword,key2){
				
				this.index=0
				this.Selected = []
				this.Selected_box = false
				sessionStorage.removeItem('alHttpData')
				this.empty()
				this.where={ "where": { "brand_id": [], "unsold_count": {}, "price": { "gt": {}, "lt": {} } }, "name": "", "page": 1, "per_page": "40", "order": {}, "keyword": {}}
				if(keyword=='男士'){
		      		 this.where.where.target='男'
		      	}else if(keyword=='女士'){
		      		this.where.where.target='女'
		      	}else if(keyword==''){
		      		this.where.keyword='闪购'
		      	}else if(keyword=="精致生活"){
		      		this.where.where.target={}
		      		this.where.where.category1_id=103
		      	}else if(keyword=="东方奢侈品"){
		      		this.where.where.target={}
		      		this.where.where.category1_id=203
		      	}else{
		      		this.where.keyword=keyword
		      	}
				if(key2){
					this.where.keyword=key2
				}
				//$("#btn_area__keyword").attr('placeholder',key2)
				var _this=this
				setTimeout(function(){
					var alHttpData = sessionStorage.getItem('alHttpData');
						alHttpData = JSON.parse(alHttpData);
						if(alHttpData != null){
							if(alHttpData.Selected){

								_this.Selected_box = true
								_this.Selected=alHttpData.Selected
								_this.pagechange()
							}
					}
				},500)
			}
		},
		mounted() {
			document.body.scrollTop = 0;
			var alHttpData = sessionStorage.getItem('alHttpData');
			alHttpData = JSON.parse(alHttpData);
			if(alHttpData != null) {
				if( alHttpData.where!=undefined){
					this.where.where.brand_id = alHttpData.where.where.brand_id
					this.where.where.category1_id = alHttpData.where.where.category1_id
					this.where.where.target = alHttpData.where.where.target
					this.Selected = alHttpData.Selected
					this.where.where.price.gteq = alHttpData.where.where.price.gteq
					this.where.where.price.lteq = alHttpData.where.where.price.lteq
				}
				if(alHttpData.Selected){
					this.Selected=alHttpData.Selected
				}

			}

			if(this.Selected.length > 0) {
				this.Selected_box = true
			}
//			if(this.$route.query.keyword) {
//				for(var i=0;i<alHttpData.Selected.length;i++){
//					if(alHttpData.Selected[i].name=="性别" &&alHttpData.Selected[i].id=="男士"){
//						this.where.where.target='男'
//					}else if(alHttpData.Selected[i].name=="性别" &&alHttpData.Selected[i].id=="女士"){
//						this.where.where.target='女'
//					}else{
						if(this.$route.query.keyword=="男士"){
							this.where.where.target = '男'
						}else if(this.$route.query.keyword=="女士"){
							this.where.where.target = '女'
						}else{
							this.where.keyword = this.$route.query.keyword
						}

//					}
//				}
//
//			}
			if(this.$route.query.brandId) {
				this.where.where.brand_id= this.$route.query.brandId
			}

			if(this.$route.query.where != undefined) {
				this.where = JSON.parse(this.$route.query.where)
				$("#btn_area__keyword").attr('placeholder',this.where.keyword)
			}

			this.pagechange()
			setTimeout(function() {
				//鼠标移入移出列表图片放大缩小
				$(".warp-img").hover(function() {

					$(this).find("img").stop().animate({
						width: "100%"
					}, 1000)
				}, function() {

					$(this).find("img").stop().animate({
						width: "85%"
					}, 1000)
				});
				$(".moreclick").hover(function() {
					$(this).css("color", "#BB1E7B");
					$(this).find("span").eq(1).css("background-position", "-616px -101px")
				}, function() {
					$(this).css("color", "#000");
					$(this).find("span").eq(1).css("background-position", "-616px -90px")
				});
			}, 1000)
		}
	}
</script>

<style lang="sass" scoped>
	@import "../../assets/sass/products/new_index.scss";
	@import "../../assets/sass/products/index.scss";
</style>
<style scoped>
	#filter .ul .zimupaixu {
		margin-bottom: 5px;
	}

	#filter .ul .zimupaixu a {
		border: 1px solid #FFF;
		margin: 13px 5px 0;
		padding: 0 5px;
		text-align: center;
		line-height: 21px;
		display: inline-block;
	}

	#filter .ul .zimupaixu .all {
		border: 1px solid #BB1E7B;
		color: #BB1E7B;
		width: 40px;
		margin: 13px 0 0 7px;
		padding: 0;
		text-align: center;
		line-height: 21px;
	}

	.ul_cont2 a:hover {
		color: #BB1E7B;
	}

	#filter .ul .zimupaixu a:hover {
		color: #BB1E7B;
		border-color: #BB1E7B;
	}

	.moreclick .uparrow {
		display: inline-block;
		width: 9px;
		height: 5px;
		background-position: -616px -90px;
	}

	.pagination {
		float: right;
	}

	.maxHeight {
		max-height: 150px;
		overflow: auto;
	}

	.contents {
		width: 1200px;
		height: 100%;
		background: #eee;
		margin: 0 auto;
		border: solid 1px #DDD;
		margin-bottom: 20px;
	}

	.contents .tip {
		position: relative;
		width: 306px;
		margin: 0 auto;
		height: 230px;
	}

	.contents .tip .product_icon {
		margin-left: 119px;
		margin-top: 20px;
		display: inline-block;
		background-image: url(~@/assets/images/products/productlist/empty_product.png?201709251800);
		width: 68px;
		height: 90px;
		background-size: 68px 90px;
	}

	.contents .tip .title {
		margin-top: 60px;
		font-size: 17px;
		text-align: center;
		color: #777;
	}
	.products {
		height: 52px;
	}
	.maxproducts{
		height: 100%;
	}
	.allHeight {
		height: 100%;
		z-index: 0;
	}
	.asc {
	    background-position: -19px -87px !important;
	}
</style>
