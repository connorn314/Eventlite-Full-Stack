class Api::LikesController < ApplicationController

    def index
        @likes = Like.where('liker_id = ?', current_user.id)
        render :index
    end


    def create
        @like = Like.new(like_params)
        if @like.liker_id == current_user.id && @like.save
            render json: "success"
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
