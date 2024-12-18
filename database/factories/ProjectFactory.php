<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdByUser = User::inRandomOrder()->first();
        if (!$createdByUser) {
            throw new \Exception("No users found in the database. Please seed the users table first.");
        }
        // 50% chance of updated_by being the same as created_by
        $updatedByUser = $this->faker->boolean(50)
            ? $createdByUser
            : User::where('id', '!=', $createdByUser->id)->inRandomOrder()->first() ?? $createdByUser;

        $createdAt = $this->faker->dateTimeBetween('-1 year', 'now');
        $updatedAt = $this->faker->dateTimeBetween($createdAt, 'now');

        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->realText(),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'image_path' => $this->faker->imageUrl(),
            'created_by' => $createdByUser->id,
            'updated_by' => $updatedByUser->id,
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Project $project) {
            // Set the status after creating the project and its tasks
            $project->status = $this->faker->randomElement(['pending', 'in_progress', 'completed']);
            $project->save(); // This will trigger the mutator
        });
    }
}
