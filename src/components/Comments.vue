<template>
<section>
    <div class="px-comment">
        <hr>
        <div v-if="pageComments.length > 0" v-for="comment in pageComments">
            <div class="text-lg font-bold">{{ comment.author }}</div>
            <div class="text-xs">{{ formatDate(comment.created_date) }}</div>
            <p class="ml-5 mt-2">{{ comment.message }}</p>
        </div>
        <p v-else>No comments here yet :(</p>
        <hr>
        <h3>Leave a comment</h3>
        <input type="text" v-model="commentName" placeholder="Name" max-length="200" class="block my-5 bg-gray p-2 border border-gray-300 rounded" style="width:clamp(5px, 100%, 400px);"/>
        <textarea v-model="commentText" placeholder="Your comment" max-length="1500" class="block my-5 bg-gray p-2 border border-gray-300 rounded w-full h-48"/>
        <button type="button" class="button mt-8" @click="postComment" :disabled="!commentName || !commentText">Post comment</button>
      </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapState } from 'pinia';
    import { useAppStore } from '@/store/appStore.ts';
    export default defineComponent ({
        setup() {
            const appStore = useAppStore()
            return { appStore }
        },
        props: {
        pageId: {type: Number, required: true}
        },
        data: () => ({
            commentName: undefined as string | undefined,
            commentText: undefined as string | undefined
        }),
        methods: {
            postComment():void {
                if (this.commentName && this.commentText) {
                    this.appStore.postComment(this.pageId, this.commentName, this.commentText);
                    this.commentName = undefined;
                    this.commentText = undefined;
                }
            },
            formatDate(date:String):string {
                let d = date.slice(0,10);
                let fields = d.split('-');
                let month = '';
                switch (fields[1]) {
                case '01':
                    month = "January";
                    break;
                case '02':
                    month = "February";
                    break;
                case '03':
                    month = "March";
                    break;
                case '04':
                    month = "April";
                    break;
                case '05':
                    month = "May";
                    break;
                case '06':
                    month = "June";
                    break;
                case '07':
                    month = "July";
                    break;
                case '08':
                    month = "August";
                    break;
                case '09':
                    month = "September";
                    break;
                case '10':
                    month = "October";
                    break;
                case '11':
                    month = "November";
                    break;
                case '12':
                    month = "December";
                    break;
                }
                return month + ' ' + fields[2] + ', ' + fields[0];
            }
        },
        computed: {
            ...mapState(useAppStore, [ 'pageComments']),
        },
        watch: {
        },
        mounted () {
            this.appStore.getPageComments(this.pageId);
        }
    })

</script>