from courses.models import Category, Course, Lesson
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['image'] = instance.image.url

        return data


class CourseSerializer(ItemSerializer):
     class Meta:
        model = Course
        fields = ['id', 'subject', 'image','created_date', 'category_id']

class LessonSerializer(ItemSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'image','created_date']


class LessonDetailsSerializer(LessonSerializer):
    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tags']