class Api::FollowsController < ApplicationController


    def index
        @follows = Follow.where('follower_id = ?', current_user.id)
        # @follows = Follow.all
        render :index
    end

    def create
        @follow = Follow.new(follow_params)
        if @follow.follower_id == current_user.id && @follow.save
            render :show
        else
            render json: { errors: @follow.errors.messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @follow = Follow.find_by(id: params[:id])
        @follow.destroy if @follow.follower_id == current_user.id
    end

    private

    def follow_params
        params.require(:follow).permit(:creator_id, :follower_id)
    end
end
