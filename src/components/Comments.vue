<template>
    <v-row>
        <v-col cols="12">
            <v-textarea
            :disabled="loading"
            v-model="commentField"
            auto-grow
            clearable
            filled
            outlined
            color="green"
            rows="2"
            placeholder="Escreva um comentário"></v-textarea>
        </v-col>
        <v-col class="text-right mt-n12" cols="12">
            <v-btn outlined :loading="loading" @click="sendComment" :disabled="!commentField" color="green" class="text-capitalize">Enviar<v-icon class="ml-1" small>mdi-send</v-icon></v-btn>
        </v-col>
        <v-col class="text-center mt-n6" cols="12">
            <span :style="{'font-weight': 'bold', 'font-size':'0.9em', 'color': 'var(--v-' + statusColor + '-base)'}">{{statusMessage}}</span>
        </v-col>
        <v-col cols="12">
            <span style="font-weight: bold; font-size:1.1em">{{treeComments.length}} {{commentNounNumber}}</span>
        </v-col>
        <v-col cols="12" v-for="(comment, index) in treeComments" :key="index">
            <v-card outlined>
                <v-card-text :style="{'background-color': 'var(--v-' + 'comment_card_background' + '-base)', 'border-bottom': '1px solid #d1d5da'}">
                    <span style="font-size:1.0em; font-weight:bold">{{comment.user.name}} comentou:</span><br>
                    <span style="font-size:0.9em; ">{{formatDateTime(comment.created_at)}}</span>
                </v-card-text>
                <v-card-text>{{comment.text}}</v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "Comments",
    props: ['selectedTree'],
    data: () => ({
        commentField: '',
        treeComments: [],
        statusMessage: '',
        statusColor: '',
    }),

    computed: {
        loading(){
            return this.$store.getters.loading;
        },
        commentNounNumber(){
            if(this.treeComments.length == 1){
                return 'Comentário';
            }else{
                return 'Comentários';
            }
        }
    },

    methods: {
        formatDateTime(dateTime){
            return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
        },
        getTreeComments(){
            this.$store.dispatch('getTreeComments', this.selectedTree.id).then(response => {
                this.treeComments = response.data;
            });        
        },
        sendComment(){
            this.$store.dispatch('addTreeComment', {
                text: this.commentField,
                user_id: this.$store.getters.user.id,
                tree_id: this.selectedTree.id}).then(response =>{
                    if(response.status == 201){
                        this.commentField = '';
                        this.statusColor = 'forest'
                        this.statusMessage = 'Comentário adicionado com sucesso!'
                        setTimeout(()=>{
                            this.statusMessage = '';
                        },3000);
                    }else{
                        this.statusColor = 'red'
                        this.statusMessage = 'Erro ao adicionar o comentário. Por favor, tente novamente.'
                        setTimeout(()=>{
                            this.statusMessage = '';
                        },3000);
                    }
                    this.getTreeComments();
                });
        }
    },

    created(){
        this.getTreeComments();
    }
}
</script>

<style>

</style>