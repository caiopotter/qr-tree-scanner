<template>
    <v-row>
        <v-col cols="12">
            <v-textarea
            :disabled="(loading || $store.getters.isVisitor)"
            v-model="commentField"
            auto-grow
            clearable
            filled
            outlined
            color="green"
            rows="2"
            :placeholder="verifyUserLoggedIn()"></v-textarea>
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
                    <span v-if="comment.user_id == loggedUser" style="font-size:1.0em; font-weight:bold">Você comentou:</span>
                    <span v-else style="font-size:1.0em; font-weight:bold">{{comment.user.name}} comentou:</span><br>
                    <span style="font-size:0.9em; ">{{formatDateTime(comment.created_at)}}</span>
                    <v-menu bottom left v-if="comment.user_id == loggedUser">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="options-icon"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
            
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in actions"
                            :key="index"
                            @click="goToAction(item, comment)">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    
                </v-card-text>
                <v-card-text>{{comment.text}}</v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-dialog v-model="deleteCommentDialog" max-width="500px">
                <v-card style="overflow: hidden">
                    <v-card-title class="mt-n1" :style="{'background-color': 'var(--v-' + 'forest' + '-base)'}">
                        <span style="color:white">
                            Deletar
                        </span>
                        <v-spacer></v-spacer>
                        <v-icon @click="deleteCommentDialog = false" style="color:white">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-actions>
                        <v-row class="text-center">
                        <v-col cols="12">
                            <span style="color:grey; font-size:0.9em">Tem certeza que deseja deletar seu comentário? A ação não poderá ser desfeita.</span>
                        </v-col>
                        <v-col cols="6">
                            <v-btn color="forest" style="color:white"
                            @click="deleteComment" :loading="loading">Deletar
                            </v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn outlined color="forest" style="color:white"
                            @click="deleteCommentDialog = false">Cancelar
                            </v-btn>
                        </v-col>
                        </v-row>
                        
                    </v-card-actions>
                </v-card>
          </v-dialog>
        </v-col>
        <v-col>
            <v-bottom-sheet v-model="deleteCommentConfirmation">
                <v-card>
                    <v-card-title>
                        <span style="color: var(--v-forest-base)">Sucesso!</span><v-spacer></v-spacer><v-btn color="forest" icon @click="deleteCommentConfirmation = false"><v-icon>mdi-close</v-icon></v-btn>    
                    </v-card-title>
                    <v-card-text>Comentário deletado com sucesso!</v-card-text>
                </v-card>
            </v-bottom-sheet>
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
        deleteCommentDialog: false,
        deleteCommentConfirmation: false,
        selectedComment: {},
        actions: [{title: 'Deletar', action: 'delete', icon: 'mdi-delete'}]
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
        },
        loggedUser(){
            return this.$store.getters.user.id;
        }
    },

    methods: {
        goToAction(item, comment){
            this.selectedComment = comment;
            switch (item.action){
                case 'delete':
                    this.deleteCommentDialog = true;
                    break;
            }
        },
        deleteComment(){
            this.deleteCommentDialog = false;
            this.$store.dispatch('deleteUserComment', this.selectedComment.id).then(response =>{
                if(response.status == 200){
                    this.deleteCommentConfirmation = true
                }
                this.getTreeComments();
            });
        },
        verifyUserLoggedIn(){
            if(!this.$store.getters.isVisitor){
                return 'Escreva um comentário'
            }else{
                return 'Somente usuários cadastrados podem comentar'
            }
        },
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
    .options-icon{
        position: absolute !important;
        right: 3%;
        top:15%;
    }
</style>