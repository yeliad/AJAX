json.array!(@things) do |thing|
  json.extract! thing, :id, :title
  json.url thing_url(thing, format: :json)
end
