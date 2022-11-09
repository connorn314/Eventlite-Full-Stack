class Api::LikesController < ApplicationController

    def index

        if current_user
            @likes = Like.where('liker_id = ?', current_user.id) 
        else
            @likes = []
        end
        
        render :index
    end


    def create
        @like = Like.new(like_params)
        if @like.liker_id == current_user.id && @like.save
            render :show
        else
            render json: { errors: @like.errors.messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.destroy if @like.liker_id == current_user.id
    end

    private 

    def like_params
        params.require(:like).permit(:event_id, :liker_id)
    end
end
