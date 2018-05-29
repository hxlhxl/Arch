#include <string>

class GradeBook {
    public:
        explicit GradeBook(std::string name);
        void setCourseName(std::string name);
        std::string getCourseName() const;
        void readInput();
        void displayGrade() const;
        int maximum(int, int, int) const;
    private:
        std::string courseName;
        int maximumGrade;
        int aGrade;
        int bGrade;
        int cGrade;
        int dGrade;
        int eGrade;
};