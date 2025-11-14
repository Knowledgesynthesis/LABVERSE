import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { glossaryTerms } from '../data';

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(glossaryTerms.map((t) => t.category)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Glossary</h1>
        <p className="text-lg text-muted-foreground">
          Clinical chemistry terms, abbreviations, and definitions
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search terms, abbreviations, definitions..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-4">
        {filteredTerms.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No terms found</p>
            </CardContent>
          </Card>
        ) : (
          filteredTerms.map((term) => (
            <Card key={term.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      {term.term}
                      {term.abbreviation && (
                        <span className="text-muted-foreground font-normal ml-2">
                          ({term.abbreviation})
                        </span>
                      )}
                    </CardTitle>
                    <div className="mt-2">
                      <Badge variant="secondary">{term.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Definition</h4>
                  <p className="text-muted-foreground">{term.definition}</p>
                </div>

                {term.clinicalRelevance && (
                  <div>
                    <h4 className="font-semibold mb-1">Clinical Relevance</h4>
                    <p className="text-muted-foreground">{term.clinicalRelevance}</p>
                  </div>
                )}

                {term.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Related Terms</h4>
                    <div className="flex flex-wrap gap-2">
                      {term.relatedTerms.map((relatedId) => {
                        const relatedTerm = glossaryTerms.find((t) => t.id === relatedId);
                        return relatedTerm ? (
                          <Badge key={relatedId} variant="outline">
                            {relatedTerm.abbreviation || relatedTerm.term}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
