
class Api::EventsController < ApplicationController

    def show
        @event = Event.find_by(id: params[:id])
        render :show
    end

    def index
        @events = Event.all
        render :index
    end

    def create
        @event = Event.new(event_params)
        

        if @event.author_id == current_user.id && @event.save
            render :show
        else
            render json: { errors: @event.errors.messages, status: :unprocessable_entity }
        end
    end

    def update
        @event = Event.find_by(id: params[:id])
        
        if @event.update(event_params)
            render :show
        else
            render json: { errors: @event.errors.messages, status: :unprocessable_entity }
        end
    end

    def destroy
        @event = Event.find_by(id: params[:id])
        @event.destroy if @event.author_id == current_user.id
        @events = Event.all
        render :index
    end

    private

    def event_params
        params.require(:event).permit(:author_id, :title, :description, :location, :start_date_raw, :end_date_raw, :start_time, :end_time)
    end
    
end
