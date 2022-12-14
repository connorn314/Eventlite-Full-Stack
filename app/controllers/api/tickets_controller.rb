class Api::TicketsController < ApplicationController

    def index
        if current_user
            @tickets = Ticket.where('owner_id = ?', current_user.id)
        else
            @tickets = []
        end
        render :index
    end

    def show
        @ticket = Ticket.find_by(id: params[:id])
        render :show
    end

    def create
        @ticket = Ticket.new(ticket_params)
        if @ticket.owner_id == current_user.id && @ticket.save
            render :show
        else
            render json: { errors: @ticket.errors.messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @ticket = Ticket.find_by(id: params[:id])
        @ticket.destroy if @ticket.owner_id == current_user.id
    end

    private

    def ticket_params
        params.require("ticket").permit(:name, :email, :owner_id, :event_id, :quantity)
    end
    
end
