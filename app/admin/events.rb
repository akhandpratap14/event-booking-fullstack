ActiveAdmin.register Event do
  permit_params :title, :description, :location, :number_of_uses, :date, :time, :host_id, :banner

  form do |f|
    f.inputs do
      f.input :title
      f.input :banner, as: :file  # Allow file upload for banner
      f.input :description
      f.input :location
      f.input :number_of_uses
      f.input :date, as: :datepicker
      f.input :time, as: :time_picker
      f.input :host_id, as: :select, collection: User.where(type: 'Host')
    end
    f.actions
  end

  show do
    attributes_table do
      row :title
      row :description
      row :location
      row :number_of_uses
      row :date
      row :time
      row :banner do |event|
        if event.banner.attached?
          image_tag url_for(event.banner), style: "max-width: 300px; height: auto;"
        else
          "No banner uploaded"
        end
      end
    end
  end
end
