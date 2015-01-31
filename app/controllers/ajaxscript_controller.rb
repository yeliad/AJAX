class AjaxscriptController < ApplicationController

	def searchPeople
		 @people = Person.all.where('first_name LIKE ?', "%#{params[:search]}%")

		 logger.debug "Just do it1 " + params[:search]
		 logger.debug @people
		 logger.debug @people.to_json
		 render json: @people.to_json


		 
 	end
end

