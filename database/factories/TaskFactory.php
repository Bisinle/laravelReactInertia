<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdByUser = User::inRandomOrder()->first();
        $assigned_user = User::inRandomOrder()->first();

        // 50% chance of updated_by being the same as created_by
        $updatedByUser = $this->faker->boolean(50)
            ? $createdByUser
            : User::where('id', '!=', $createdByUser->id)->inRandomOrder()->first()??$createdByUser;

        $createdAt = $this->faker->dateTimeBetween('-1 year', 'now');
        $updatedAt = $this->faker->dateTimeBetween($createdAt, 'now');
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()
                ->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => fake()
                ->randomElement(['low', 'medium', 'high']),
            'image_path' => fake()->imageUrl(),
            'assigned_user_id' => $assigned_user,



            'created_by' => $createdByUser->id,
            'updated_by' => $updatedByUser->id,
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
        ];
    }
}
