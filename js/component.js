
//for data change

var Event = new Vue();

Vue.component("tabs", {
    template: `
        <div class="tab">
            <ul>
                <li v-for="tab in tabs" :class="{'active': tab.selectedNow}" @click="makeEvent(tab.name)">
                    {{ tab.name }}
                </li>
               
            </ul>
            <div class="details">
                <slot></slot>
            </div>
        </div>
    `,
    data: function() {
        return {
            tabs: []
        }
    },
    methods: {
        makeEvent: function(s) {
                Event.$emit("tabchange", s);
        }

    },

    created: function() {
        this.tabs = this.$children
    }

})


Vue.component("tab", {
    template: `

    <div v-if="selectedNow">
    <slot></slot>
    </div>
        
    `,
    data: function() {
        return {
            selectedNow : false
        }
    },

    

    created: function() {
            var currentTab = this;
            currentTab.selectedNow = currentTab.selected;
            Event.$on("tabchange", function(s){
                console.log(s);

                if(s == currentTab.name) {
                    currentTab.selectedNow = true;
                } else {
                    currentTab.selectedNow = false;
                }

            })
    },
    props: ['name', 'selected']

})